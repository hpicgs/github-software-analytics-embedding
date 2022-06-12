echo "Hello $1"
time=$(date)
echo "::set-output name=time::$time"

# Installing tokei
apk add tokei

# Use tokei to generate metrics.json
tokei ./src -o metrics.json