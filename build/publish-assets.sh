cd assets
aws s3 sync ./ s3://tdn17 --delete --exclude ".DS_Store" --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers
cd ..
