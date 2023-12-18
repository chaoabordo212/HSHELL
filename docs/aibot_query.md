### **List of apps potentially used in this project:** 
passwd
passmass
pgp
sssd
lecm
pgpgpg
openssl
passphrase-encoding
tomb
pass-tomb
pwgen
passphrase_generator
pass
passky
pass-tail
pass-audit
pass-otp
openssl-tpm-engine
opencryptoki
parsec-tool
gnome-keysign
clevis

### **zentralize.sh sequence:** 
check if user $ZENTRALIZE_USER exists
	if not, make it
	else; continue
check if $ZENTRALIZE_USER_HOME exists
	if exists; then
		check if $ZENTRALIZE_USER_HOME/.zentralize folder exists
			if not, make it
		else; continue
		for each line in local.d/bin and local.d/sbin check if  packages/binary is installed/executable and if not, find a way to install/setup/initialize specified command
		else; continue
		use tomb dig to make $ZENTRALIZE_USER_HOME/.zentralize/init_tomb as tomb and change pwd to inside it
/