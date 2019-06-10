#!/bin/bash
set -e

mongo <<EOF
use Legion
db.createUser({
  user:  '$LEGION_WEB_USERNAME',
  pwd: '$LEGION_WEB_PASSWORD',
  roles: ['readWrite']
})

EOF
