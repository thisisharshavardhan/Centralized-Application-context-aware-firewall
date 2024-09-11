$path = "C:\Program Files\BraveSoftware\Brave-Browser\Application"
$executables = Get-ChildItem -Path $path -Filter *.exe

foreach ($exe in $executables) {
    $exePath = $exe.FullName
    netsh advfirewall firewall add rule name="Block Brave Browser - $($exe.Name)" dir=out action=block program="$exePath" enable=yes
    netsh advfirewall firewall add rule name="Block Brave Browser - $($exe.Name)" dir=in action=block program="$exePath" enable=yes
}