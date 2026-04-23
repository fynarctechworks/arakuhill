$sourceDir = "E:\Projects\fynarc\Arakuhillcoffee\assets\coffee-bean-animation"
$targetDir = "E:\Projects\fynarc\Arakuhillcoffee\react-app\public\images\bean-sequence"

if (!(Test-Path $targetDir)) {
    New-Item -ItemType Directory -Force -Path $targetDir | Out-Null
}

for ($i = 51; $i -le 130; $i++) {
    $numStr = "{0:D3}" -f $i
    
    $file1 = Join-Path $sourceDir "ezgif-frame-$numStr-Photoroom (1).png"
    $file2 = Join-Path $sourceDir "ezgif-frame-$numStr-Photoroom.png"
    
    $targetFile = Join-Path $targetDir "frame-$numStr.png"
    
    if (Test-Path $file1) {
        Copy-Item -Path $file1 -Destination $targetFile -Force
    } elseif (Test-Path $file2) {
        Copy-Item -Path $file2 -Destination $targetFile -Force
    } else {
        Write-Host "Missing frame $numStr"
    }
}
Write-Host "Done copying frames"
