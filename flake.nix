{
  description = "React project with pnpm";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          config = { allowUnfree = true; };
        };
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_20
            nodePackages.pnpm
            nodePackages.typescript
            nodePackages.typescript-language-server
            nodePackages.prettier
            nodePackages.eslint
          ];

          shellHook = ''
            echo "React + pnpm development environment"
            echo "Node.js: $(${pkgs.nodejs_20}/bin/node --version)"
            echo "pnpm: $(${pkgs.nodePackages.pnpm}/bin/pnpm --version)"
            
            # Ensure pnpm is using the project's node_modules
            export PNPM_HOME="$PWD/node_modules/.pnpm"
            
            # Add node_modules/.bin to PATH
            export PATH="$PWD/node_modules/.bin:$PATH"
          '';
        };
      }
    );
} 