{
  description = "A very basic flake";
  inputs = { nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable"; };

  outputs = { self, nixpkgs }: rec {
    system = "x86_64-linux";
    pkgs = import nixpkgs { inherit system; };

    packages.${system}.default = pkgs.mkShell {
      buildInputs = with pkgs; [ nodePackages_latest.ts-node go pprof ];
    };

  };

}
