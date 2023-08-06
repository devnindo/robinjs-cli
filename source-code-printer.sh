#!/bin/bash

if [ $# -ne 2 ]
then
    echo "Usage: $0 directory extension"
    exit 1
fi

directory=$1
extension=$2

find "$directory" -type f -name "*.$extension" -print0 | while IFS= read -r -d '' file
do
    echo "//$file"
    echo "\`\`\`"
    cat "$file"
    echo "\`\`\`"
    echo ""
done

#./source-code-printer.sh /home/user/documents txt
#./source-code-printer.sh /home/user/documents txt > output.txt