#!/bin/bash -xe

LOCATION="build"
FILES="htm|css|html|js"

process() {

DEBUG=1
SLEEP_DELAY=0.1

        FILE="$1"

        if [ -f "$FILE".gz ]
        then
                FILE_ORIG=$(stat -c %Y "$FILE")
                FILE_GZIP=$(stat -c %Y "$FILE".gz)
                if [ $FILE_ORIG -gt $FILE_GZIP ]
                then
                        rm "$FILE".gz
                        zopfli "$FILE"
                        if [ "$DEBUG" == 1 ]
                        then
                                echo "Deleted old .gz and created new one at: $FILE.gz"
                                sleep $SLEEP_DELAY
                        fi
                else
                        if [ "$DEBUG" == 1 ]
                        then
                                echo "Skipping - Already up to date: $FILE.gz" 
                        fi
                fi
        else
                zopfli "$FILE"
                if [ "$DEBUG" == 1 ]
                then
                        echo "Created new: $FILE.gz"
                        sleep $SLEEP_DELAY
                fi
        fi
}
export -f process
find $LOCATION -type f -regextype posix-extended -regex '.*\.('$FILES')' -exec /bin/bash -c 'process "{}"' \;

# And dumb brotli precompile
# find $LOCATION -type f -regextype posix-extended -regex '.*\.('$FILES')' -exec brotli --input ${} --output ${}.br \;
