import psycopg2
import json
from config import Config


class Excecutor:
    @staticmethod
    def raw_excecute(sql_str: str, input_json: json = None):
        connection = None
        cursor = None
        output = {}
        output['status'] = 0

        try:
            connection = Excecutor.get_connect()

            cursor = connection.cursor()

            if input_json is not None:
                cursor.execute(sql_str, (json.dumps(input_json), ))
            else:
                if sql_str.find("%s") != -1:
                    raise Exception('Probably expected parameters, but json with parameters is not passed', sql_str)
                cursor.execute(sql_str)

            data = cursor.fetchone()
            output = data[0]
        except Exception as e:
            output['status'] = 1
            output["message"] = str(e)

        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.commit()
                connection.close()
        return output

    @staticmethod
    def get_connect():
        try:
            return psycopg2.connect(**Config.database)
        except psycopg2.Error as e:
            raise Exception(f'Database connection error... Details: {e.pgerror}')

    
    def check_output(output):
        """Check response from Database."""
        if output is None:
            raise ValueError("output=None")
        if type(output) != dict:
            raise Exception(f"Error: '{output}' to dict. Type: {type(output)}")
        if output.get('status') is None:
            raise Exception(f"Not key 'status' в '{output}'")
        elif output.get('status') == 1 or output.get('status') == '1':
            if output.get('message') is None:
                raise Exception(f"Not key 'message' '{output}'")
            raise Exception(output['message'])
        text = str(output)
        if text.find('None') != -1:
            raise Exception("Пришел null из БД. Нужно обратиться к человеку, который писал метод."
                            "(Эту проверку нужно убрать после тестирования).", output)

    @staticmethod
    def excecute_with_check(sql_str: str, input_json=None):
        """Выполнение с проверкой."""
        output = {}
        output['status'] = 0
        try:
            output = Excecutor.raw_excecute(sql_str, input_json)
            Excecutor.check_output(output=output)
        except Exception as e:
            output['status'] = 1
            output['message'] = str(e)
        return output