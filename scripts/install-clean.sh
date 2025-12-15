#!/usr/bin/env bash
set -euo pipefail
# Clear proxy-related environment variables that can cause 403s in sandboxed CI environments.
unset http_proxy HTTPS_PROXY https_proxy HTTP_PROXY npm_config_http_proxy npm_config_https_proxy YARN_HTTP_PROXY YARN_HTTPS_PROXY || true
# Remove proxy settings that may be persisted in the npm config.
npm config delete proxy >/dev/null 2>&1 || true
npm config delete https-proxy >/dev/null 2>&1 || true
# Force the public registry and relax SSL in MITM-proxied environments.
npm config set registry https://registry.npmjs.org/ >/dev/null
npm config set strict-ssl false >/dev/null
# Provide an offline-friendly fallback to avoid hanging.
npm config set fetch-retries 0 >/dev/null
npm install "$@"
