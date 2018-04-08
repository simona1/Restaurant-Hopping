Vagrant.configure(2) do |config|
  config.vm.box = 'ubuntu/xenial64'

  config.vm.provider 'virtualbox' do |vb|
    vb.gui = false
    vb.memory = 4096
  end

  config.vm.network :forwarded_port, guest: 5000, host: 5000

  config.vm.provision 'shell', keep_color: true, privileged: false, inline: <<-SHELL
    sudo apt-get -yq update
    sudo apt-get -yq upgrade

    sudo apt-get install -yq git

    curl https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh |
      bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
    nvm install node

    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    sudo apt-get -yq update && sudo apt-get -yq install yarn
  SHELL
end
