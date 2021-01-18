instant-public-folder
=====================

Using ngrok, instantly give a folder from your computer a public url. Allow your friends to transfer large files without first uploading to the cloud, and without authenticating.

Usage
-----

```sh
npx instant-public-folder
# and send the https url from the ngrok interface to your friends!
```

OR

```sh
npm -g instant-public-folder
instant-public-folder
# and send the https url from the ngrok interface to your friends!
```

You probably want to zip any large files first. Here are some ways to do that on OSX:

```sh
brew install p7zip
7z a name-of-my-archive.7z file1 file2 fileN
```

```sh
brew install zip
zip -9 -u name-of-my-archive.zip file1 file2 filen
```

Or just right click a folder in Finder and choose "Compress" :)

Features / Notes
--------

- Built in directory listing
- Allows anyone to download a file
- Nearly zero security (at least has HTTPS!)
- No auth / accounts required (unless you want to use paid ngrok)
- Note: ngrok is a closed-source binary

License
-------

ISC