#! /usr/bin/env sh

export ASPNETCORE_ENVIRONMENT=Development

REALPATH=$(realpath $0)

DIR=$(dirname "$REALPATH")

if [ -f "$DIR/.env" ]
then
    export $(cat $DIR/.env | sed 's/#.*//g' | xargs -0)
fi

