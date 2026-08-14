# ============================================================================
#  DEU BUG AQUI OPTIMIZER - INSTALADOR v4
#  Deu Bug Aqui | Developed by RZ
#
#  O que faz (tudo em uma janela, sem depender de .bat para abrir):
#   1. Baixa o DeuBugAquiOptimizer.bat oficial e VERIFICA o SHA256;
#   2. Extrai o produto (ps1 + logo) e o Win11Debloat de DENTRO do .bat;
#   3. Abre o produto em uma janela nova do PowerShell.
#
#  Modo direto Win11Debloat (abre a tela original do Raphire):
#   & ([scriptblock]::Create((irm "https://SEU-SITE/install.ps1"))) -Sha "HASH" -Raphire
# ============================================================================
[CmdletBinding()]
param(
    [string]$Url     = 'https://deubugstore.com.br/deubugaqui/DeuBugAquiOptimizer.bat',
    [string]$LogoUrl = 'https://deubugstore.com.br/deubugaqui/logo.png',
    [string]$Sha     = '',
    [switch]$Raphire
)

$ErrorActionPreference = 'Stop'

try {
    [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12
} catch { }

function Get-Elevated {
    try {
        $p = New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())
        return $p.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
    } catch {
        return $true
    }
}

Write-Host ''
Write-Host '  ================================================================' -ForegroundColor Magenta
Write-Host '   DEU BUG AQUI OPTIMIZER - INSTALADOR OFICIAL v4.1' -ForegroundColor Cyan
Write-Host '   Gaming Performance Suite | Developed by RZ' -ForegroundColor Green
Write-Host '  ================================================================' -ForegroundColor Magenta
Write-Host ''

$root = Join-Path $env:LOCALAPPDATA 'DeuBugAqui'
if (-not (Test-Path $root)) { New-Item -ItemType Directory -Path $root -Force | Out-Null }
$bat = Join-Path $root 'DeuBugAquiOptimizer.bat'

# ---- 1) Download ---------------------------------------------------------
Write-Host '  [1/5] Baixando a versao oficial...' -ForegroundColor Cyan
$params = @{ Uri = $Url; OutFile = $bat; Headers = @{ 'Cache-Control' = 'no-cache' } }
try {
    if ($PSVersionTable.PSVersion.Major -le 5) {
        Invoke-WebRequest @params -UseBasicParsing
    } else {
        Invoke-WebRequest @params
    }
} catch {
    Write-Host '  [ERRO] Nao foi possivel baixar o produto.' -ForegroundColor Red
    Write-Host ('         Endereco tentado: ' + $Url) -ForegroundColor Red
    if ($_.Exception.Message -match '404') {
        Write-Host '         Causa: o arquivo nao existe nesse endereco (404).' -ForegroundColor Yellow
    } else {
        Write-Host ('         Detalhe: ' + $_.Exception.Message) -ForegroundColor Red
    }
    Write-Host ''
    return
}

# ---- 2) Integridade -------------------------------------------------------
Write-Host '  [2/5] Verificando integridade (SHA256)...' -ForegroundColor Cyan
if ($Sha -ne '') {
    $hash = (Get-FileHash -Algorithm SHA256 -Path $bat).Hash.ToUpperInvariant()
    if ($hash -ne $Sha.ToUpperInvariant()) {
        Write-Host '  [ERRO] FALHA DE INTEGRIDADE: o hash nao confere.' -ForegroundColor Red
        Write-Host ('         Arquivo mantido para conferencia: ' + $bat) -ForegroundColor Red
        Write-Host ('         Hash esperado: ' + $Sha.ToUpperInvariant()) -ForegroundColor Yellow
        Write-Host ('         Hash do arquivo: ' + $hash) -ForegroundColor Yellow
        Write-Host ''
        return
    }
    Write-Host '  [OK] Arquivo integro.' -ForegroundColor Green
} else {
    Write-Host '  [AVISO] Hash nao informado - recomenda-se usar -Sha.' -ForegroundColor Yellow
}

# ---- 3) Extracao local (o instalador NAO depende do .bat para abrir) ------
Write-Host '  [3/5] Preparando a aplicacao (primeira vez pode demorar alguns segundos)...' -ForegroundColor Cyan
try {
    $batText = [IO.File]::ReadAllText($bat)
    $verMatch = [regex]::Match($batText, 'set "DB_VER=([0-9\.]+)"')
    if ($verMatch.Success) { $ver = $verMatch.Groups[1].Value } else { $ver = 'cur' }
    $dir = Join-Path $root $ver
    if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
    $ps1Path = Join-Path $dir 'DeuBugAquiOptimizer.ps1'

    if (-not (Test-Path $ps1Path)) {
        $m = [regex]::Match($batText, '::PAYLOAD_PS1_BEGIN::([A-Za-z0-9+/=]+)')
        if (-not $m.Success) { throw 'payload do produto nao encontrado' }
        [IO.File]::WriteAllText($ps1Path,
            [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($m.Groups[1].Value)),
            (New-Object System.Text.UTF8Encoding($true)))
        $m2 = [regex]::Match($batText, '::PAYLOAD_LOGO_BEGIN::([A-Za-z0-9+/=]+)')
        if ($m2.Success) {
            [IO.File]::WriteAllText((Join-Path $dir 'logo.txt'),
                [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String($m2.Groups[1].Value)))
        }
        $m3 = [regex]::Match($batText, '::PAYLOAD_W11D_BEGIN::([A-Za-z0-9+/=]+)')
        if ($m3.Success) {
            $zipTmp = Join-Path $dir 'w11d.zip'
            [IO.File]::WriteAllBytes($zipTmp, [Convert]::FromBase64String($m3.Groups[1].Value))
            $w11dDir = Join-Path $dir 'Win11Debloat'
            # AUTOCURA: pasta criada pela metade em execucoes anteriores e
            # apagada e re-extraida (corrige "unable to find required files")
            if ((Test-Path $w11dDir) -and -not (Test-Path (Join-Path $w11dDir 'Win11Debloat.ps1'))) {
                Remove-Item $w11dDir -Recurse -Force -ErrorAction SilentlyContinue
            }
            if (-not (Test-Path $w11dDir)) {
                Write-Host '  (extraindo o Win11Debloat - aguarde alguns segundos...)' -ForegroundColor DarkGray
                Expand-Archive -Path $zipTmp -DestinationPath $w11dDir -Force
            }
            Remove-Item $zipTmp -Force -ErrorAction SilentlyContinue
        }
        [IO.File]::WriteAllText((Join-Path $dir 'versao.stamp'), $ver)
    }

    # Logo oficial (para a tela Sobre do produto)
    $logoDir = Join-Path $dir 'assets'
    $logoFile = Join-Path $logoDir 'logo.png'
    if (-not (Test-Path $logoFile) -and $LogoUrl -ne '') {
        try {
            if (-not (Test-Path $logoDir)) { New-Item -ItemType Directory -Path $logoDir -Force | Out-Null }
            $lparams = @{ Uri = $LogoUrl; OutFile = $logoFile; Headers = @{ 'Cache-Control' = 'no-cache' } }
            if ($PSVersionTable.PSVersion.Major -le 5) {
                Invoke-WebRequest @lparams -UseBasicParsing
            } else {
                Invoke-WebRequest @lparams
            }
        } catch { }
    }
} catch {
    Write-Host '  [ERRO] Falha ao preparar a aplicacao: ' + $_.Exception.Message -ForegroundColor Red
    Write-Host ''
    return
}

# ---- 4) Termos (primeira vez) ---------------------------------------------
$licFile = Join-Path $dir 'licenca.aceita'
if (-not (Test-Path $licFile)) {
    Write-Host '  [4/5] Termos de uso:' -ForegroundColor Cyan
    Write-Host '        - Produto de uso autorizado para clientes Deu Bug Aqui;'
    Write-Host '        - Toda alteracao e exibida antes de aplicar e pode ser revertida;'
    Write-Host '        - Nenhuma informacao deste computador e enviada a lugar nenhum.'
    $r = Read-Host '        Aceita? (S/N)'
    if ($r -notmatch '^[sS]') {
        Write-Host '  Termos recusados. O produto nao sera executado.' -ForegroundColor Yellow
        Write-Host ''
        return
    }
    [IO.File]::WriteAllText($licFile, 'aceito')
} else {
    Write-Host '  [4/5] Termos ja aceitos nesta maquina.' -ForegroundColor Cyan
}

# ---- 5) Abrir -------------------------------------------------------------
Write-Host '  [5/5] Abrindo...' -ForegroundColor Cyan
$elevated = Get-Elevated

if ($Raphire) {
    $target = Join-Path $dir 'Win11Debloat\Win11Debloat.ps1'
    $wd = Split-Path -Parent $target
    $args = @('-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', $target, '-CLI')
} else {
    $target = $ps1Path
    $wd = $dir
    $args = @('-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', $ps1Path)
}

if (-not (Test-Path $target)) {
    Write-Host '  [ERRO] Arquivo nao encontrado: ' + $target -ForegroundColor Red
    Write-Host '  Rode o instalador novamente para re-extrair.' -ForegroundColor Yellow
    Write-Host ''
    return
}

try {
    if ($elevated) {
        Start-Process -FilePath 'powershell' -ArgumentList $args -WorkingDirectory $wd
    } else {
        Start-Process -FilePath 'powershell' -ArgumentList $args -WorkingDirectory $wd -Verb RunAs
    }
    Write-Host ''
    if ($Raphire) {
        Write-Host '  [OK] O menu ORIGINAL do Win11Debloat abriu em uma janela nova.' -ForegroundColor Green
        Write-Host '  (use setas + Enter la dentro; ao fechar, rode de novo para voltar)' -ForegroundColor Yellow
    } else {
        Write-Host '  [OK] O Deu Bug Aqui Optimizer abriu em uma janela nova.' -ForegroundColor Green
        Write-Host '  (se o UAC aparecer, confirme para liberar o menu completo)' -ForegroundColor Yellow
    }
} catch {
    Write-Host '  [AVISO] Nao foi possivel abrir automaticamente neste ambiente.' -ForegroundColor Yellow
    Write-Host '  Abra manualmente (duplo clique ou colando no PowerShell):' -ForegroundColor Yellow
    Write-Host ('    ' + $target) -ForegroundColor Yellow
}
Write-Host ''
