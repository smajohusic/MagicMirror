if [ -z "$DISPLAY" ]; then
	export DISPLAY=:0
fi
electron javascript/electron/main.js $1