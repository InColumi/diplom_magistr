import React, { ReactElement } from 'react'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Switch,
} from '@material-tailwind/react'

type SettingsProps = {
    isOpen: boolean
    isNightMode: boolean
    isShowAnimations: boolean
    setOpen: (data: boolean) => void
    handleSwitch: (e: React.FormEvent<HTMLInputElement>) => void
}

const Settings = ({
    isOpen,
    isNightMode,
    isShowAnimations,
    setOpen,
    handleSwitch,
}: SettingsProps): ReactElement => {
    return (
        <>
            <Dialog
                open={isOpen}
                size="sm"
                handler={setOpen}
                className="bg-night"
            >
                <DialogHeader className="w-full px-0 pt-0">
                    <div className="w-full text-center text-gray-400 2xl:text-4xl xl:text-2xl border-b-2 border-nightbg rounded-t-lg py-5">
                        Settings
                    </div>
                </DialogHeader>
                <DialogBody>
                    <div className="flex w-full justify-between px-5">
                        <h2 className="2xl:text-2xl xl:text-lg font-bold uppercase">
                            Night theme
                        </h2>
                        <Switch
                            id="mode"
                            checked={isNightMode}
                            onChange={(
                                e: React.FormEvent<HTMLInputElement>
                            ): void => handleSwitch(e)}
                        />
                    </div>
                    <div className="flex w-full justify-between px-5 pt-5">
                        <h2 className="2xl:text-2xl xl:text-lg font-bold uppercase">
                            Animations
                        </h2>
                        <Switch
                            id="animation"
                            checked={isShowAnimations}
                            onChange={(
                                e: React.FormEvent<HTMLInputElement>
                            ): void => handleSwitch(e)}
                        />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={() => setOpen(false)}
                        className="mr-2"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="green"
                        // onClick={() => handleOpen(null)}
                    >
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}

export default Settings
