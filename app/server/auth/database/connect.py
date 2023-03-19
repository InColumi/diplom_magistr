import psycopg2
from config import Config


class Excecutor:
    @staticmethod
    def raw_excecute(sql_str: str):
        connection = None
        cursor = None
        output = {}
        output['status'] = 0

        try:
            connection = Excecutor.get_connect()

            cursor = connection.cursor()
            cursor.execute(sql_str)

            data = cursor.fetchone()
            output['data'] = data
        except Exception as e:
            output['status'] = 1
            output["message"] = str(e)

        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()
        return output

    @staticmethod
    def get_connect():
        try:
            return psycopg2.connect(**Config.database)
        except psycopg2.Error as e:
            raise Exception(f'Database connection error... Details: {e.pgerror}')
