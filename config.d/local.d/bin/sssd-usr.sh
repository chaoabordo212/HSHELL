#!/bin/bash


      # Generate a random password using mkpasswd
      PASSWORD=$(mkpasswd -l 12 -s 0)
      
      # Print the generated password                                       
      echo "Generated Password: $PASSWORD"                                
                                                                                                                                                       
      # Use the generated password to create a new OpenPGP key
      # Replace 'Your Name' and 'your@email.com' with your actual name and email
      gpg --batch --passphrase $PASSWORD --quick-gen-key "Your Name <your@email.com>"
            
      # Configure SSSD  
      # Replace 'your_domain' and 'your_server' with your actual domain and server
      echo '[sssd]   
      services = nss, pam, ssh
      config_file_version = 2
      domains = your_domain
      
      [nss]
                    
      [pam]       
                    
      [domain/your_domain]   
      id_provider = ldap            
      auth_provider = ldap
      ldap_uri = ldap://your_server                                        
      ldap_search_base = dc=example,dc=com
      ldap_tls_reqcert = demand
      ldap_tls_cacert = /etc/pki/tls/certs/ca-bundle.crt' > /etc/sssd/sssd.conf
                                                                                                                                                       
      # Restart SSSD service
