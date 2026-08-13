# ============================================================================
#  DEU BUG AQUI OPTIMIZER - INSTALADOR VIA POWERSHELL (v1.0)
#  Deu Bug Aqui | Developed by RZ
#
#  O que faz:
#   1. Baixa o DeuBugAquiOptimizer.bat oficial do SEU site;
#   2. VERIFICA o SHA256 (se -Sha for informado) - se nao bater,
#      apaga # ============================================================================
#  DEU BUG AQUI OPTIMIZER - INSTALADOR VIA POWERSHELL (v1.0)
#  Deu Bug Aqui | Developed by RZ
#
#  O que faz:
#   1. Baixa o DeuBugAquiOptimizer.bat oficial do SEU site;
#   2. VERIFICA o SHA256 (se -Sha for informado) - se nao bater,
#      apaga o arquivo e aborta (protecao contra arquivo corrompido
#      ou adulterado);
#   3. Baixa a logo oficial (opcional) para a mesma pasta;
#   4. Desbloqueia (SmartScreen) e executa o produto.
#
#  O produto em si (o .bat) continua pedindo elevacao UAC e abrindo
#  o menu completo, com Dry-Run, backup e reversao.
# ============================================================================
[CmdletBinding()]
param(
    [string]$Url     = 'https://deubugstore.com.br/deubugaqui/DeuBugAquiOptimizer.bat',
    [string]$LogoUrl = 'https://deubugstore.com.br/deubugaqui/logo.png',
    [string]$Sha     = ''
)

$ErrorActionPreference = 'Stop'

# TLS 1.2 (o Windows PowerShell 5.1 usa padrao antigo)
try {
    [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12
} catch { }

$dest = Join-Path $env:LOCALAPPDATA 'DeuBugAqui'
if (-not (Test-Path $dest)) { New-Item -ItemType Directory -Path $dest -Force | Out-Null }
$bat = Join-Path $dest 'DeuBugAquiOptimizer.bat'

Write-Host ''
Write-Host '  ================================================================' -ForegroundColor Magenta
Write-Host '   DEU BUG AQUI OPTIMIZER - INSTALADOR OFICIAL' -ForegroundColor Cyan
Write-Host '   Gaming Performance Suite | Developed by RZ' -ForegroundColor Green
Write-Host '  ================================================================' -ForegroundColor Magenta
Write-Host ''

Write-Host '  [1/4] Baixando a versao oficial...' -ForegroundColor Cyan
$params = @{ Uri = $Url; OutFile = $bat }
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
        Write-Host '         O arquivo ainda nao foi publicado no servidor -' -ForegroundColor Yellow
        Write-Host '         siga o guia PUBLICAR_POWERSHELL.txt do pacote.' -ForegroundColor Yellow
    } else {
        Write-Host ('         Detalhe: ' + $_.Exception.Message) -ForegroundColor Red
    }
    Write-Host ''
    exit 1
}

if ($Sha -ne '') {
    Write-Host '  [2/4] Verificando integridade (SHA256)...' -ForegroundColor Cyan
    $hash = (Get-FileHash -Algorithm SHA256 -Path $bat).Hash.ToUpperInvariant()
    if ($hash -ne $Sha.ToUpperInvariant()) {
        Remove-Item -Path $bat -Force -ErrorAction SilentlyContinue
        Write-Host '  [ERRO] FALHA DE INTEGRIDADE: o arquivo baixado nao' -ForegroundColor Red
        Write-Host '         corresponde a versao oficial. Nada foi executado.' -ForegroundColor Red
        Write-Host ''
        exit 1
    }
    Write-Host '  [OK] Arquivo integro (hash confere com a versao oficial).' -ForegroundColor Green
} else {
    Write-Host '  [2/4] Verificacao de hash NAO informada - recomenda-se usar -Sha.' -ForegroundColor Yellow
}

Write-Host '  [3/4] Baixando a logo oficial (opcional)...' -ForegroundColor Cyan
if ($LogoUrl -ne '') {
    try {
        $logoPath = Join-Path $dest 'logo.png'
        $lparams = @{ Uri = $LogoUrl; OutFile = $logoPath }
        if ($PSVersionTable.PSVersion.Major -le 5) {
            Invoke-WebRequest @lparams -UseBasicParsing
        } else {
            Invoke-WebRequest @lparams
        }
        Write-Host '  [OK] Logo salva.' -ForegroundColor Green
    } catch {
        Write-Host '  [AVISO] Nao foi possivel baixar a logo (o produto funciona sem ela).' -ForegroundColor Yellow
    }
}

try { Unblock-File -Path $bat -ErrorAction Stop } catch { }
Write-Host '  [4/4] Iniciando o produto...' -ForegroundColor Cyan
Write-Host ''
try {
    Start-Process -FilePath $bat
} catch {
    Write-Host '  [AVISO] Nao foi possivel abrir automaticamente neste ambiente.' -ForegroundColor Yellow
    Write-Host ('  Abra manualmente (duplo clique): ' + $bat) -ForegroundColor Yellow
}
Write-Host '  Confirme a janela do UAC (Controle de Conta de Usuario) para' -ForegroundColor Yellow
Write-Host '  liberar o menu completo de otimizacao.' -ForegroundColor Yellow
Write-Host ''
o arquivo e aborta (protecao contra arquivo corrompido
#      ou adulterado);
#   3. Baixa a logo oficial (opcional) para a mesma pasta;
#   4. Desbloqueia (SmartScreen) e executa o produto.
#
#  O produto em si (o .bat) continua pedindo elevacao UAC e abrindo
#  o menu completo, com Dry-Run, backup e reversao.
# ============================================================================
[CmdletBinding()]
param(
    [string]$Url     = 'https://deubugstore.com.br/deubugaqui/DeuBugAquiOptimizer.bat',
    [string]$LogoUrl = 'https://deubugstore.com.br/deubugaqui/logo.png',
    [string]$Sha     = ''
)

$ErrorActionPreference = 'Stop'

# TLS 1.2 (o Windows PowerShell 5.1 usa padrao antigo)
try {
    [Net.ServicePointManager]::SecurityProtocol = [Net.ServicePointManager]::SecurityProtocol -bor [Net.SecurityProtocolType]::Tls12
} catch { }

$dest = Join-Path $env:LOCALAPPDATA 'DeuBugAqui'
if (-not (Test-Path $dest)) { New-Item -ItemType Directory -Path $dest -Force | Out-Null }
$bat = Join-Path $dest 'DeuBugAquiOptimizer.bat'

Write-Host ''
Write-Host '  ================================================================' -ForegroundColor Magenta
Write-Host '   DEU BUG AQUI OPTIMIZER - INSTALADOR OFICIAL' -ForegroundColor Cyan
Write-Host '   Gaming Performance Suite | Developed by RZ' -ForegroundColor Green
Write-Host '  ================================================================' -ForegroundColor Magenta
Write-Host ''

Write-Host '  [1/4] Baixando a versao oficial...' -ForegroundColor Cyan
$params = @{ Uri = $Url; OutFile = $bat }
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
        Write-Host '         O arquivo ainda nao foi publicado no servidor -' -ForegroundColor Yellow
        Write-Host '         siga o guia PUBLICAR_POWERSHELL.txt do pacote.' -ForegroundColor Yellow
    } else {
        Write-Host ('         Detalhe: ' + $_.Exception.Message) -ForegroundColor Red
    }
    Write-Host ''
    exit 1
}

if ($Sha -ne '') {
    Write-Host '  [2/4] Verificando integridade (SHA256)...' -ForegroundColor Cyan
    $hash = (Get-FileHash -Algorithm SHA256 -Path $bat).Hash.ToUpperInvariant()
    if ($hash -ne $Sha.ToUpperInvariant()) {
        Remove-Item -Path $bat -Force -ErrorAction SilentlyContinue
        Write-Host '  [ERRO] FALHA DE INTEGRIDADE: o arquivo baixado nao' -ForegroundColor Red
        Write-Host '         corresponde a versao oficial. Nada foi executado.' -ForegroundColor Red
        Write-Host ''
        exit 1
    }
    Write-Host '  [OK] Arquivo integro (hash confere com a versao oficial).' -ForegroundColor Green
} else {
    Write-Host '  [2/4] Verificacao de hash NAO informada - recomenda-se usar -Sha.' -ForegroundColor Yellow
}

Write-Host '  [3/4] Baixando a logo oficial (opcional)...' -ForegroundColor Cyan
if ($LogoUrl -ne '') {
    try {
        $logoPath = Join-Path $dest 'logo.png'
        $lparams = @{ Uri = $LogoUrl; OutFile = $logoPath }
        if ($PSVersionTable.PSVersion.Major -le 5) {
            Invoke-WebRequest @lparams -UseBasicParsing
        } else {
            Invoke-WebRequest @lparams
        }
        Write-Host '  [OK] Logo salva.' -ForegroundColor Green
    } catch {
        Write-Host '  [AVISO] Nao foi possivel baixar a logo (o produto funciona sem ela).' -ForegroundColor Yellow
    }
}

try { Unblock-File -Path $bat -ErrorAction Stop } catch { }
Write-Host '  [4/4] Iniciando o produto...' -ForegroundColor Cyan
Write-Host ''
try {
    Start-Process -FilePath $bat
} catch {
    Write-Host '  [AVISO] Nao foi possivel abrir automaticamente neste ambiente.' -ForegroundColor Yellow
    Write-Host ('  Abra manualmente (duplo clique): ' + $bat) -ForegroundColor Yellow
}
Write-Host '  Confirme a janela do UAC (Controle de Conta de Usuario) para' -ForegroundColor Yellow
Write-Host '  liberar o menu completo de otimizacao.' -ForegroundColor Yellow
Write-Host ''
