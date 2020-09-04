#!/bin/bash
set -e

mongo <<EOF
use Legion

db.createUser({
  user:  'LegionWeb',
  pwd: '$LEGION_Mongo__WebPassword',
  roles: ['readWrite']
})

EOF
