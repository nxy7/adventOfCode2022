{
  description = "A very basic flake";

  outputs = { self, nixpkgs }: rec {
    system = "x86_64-linux";
    pkgs = import nixpkgs { inherit system; };

    packages.${system}.default = pkgs.mkShell {
      buildInputs = with pkgs; [ zig nodePackages_latest.ts-node go ];
    };

  };

}
