.PHONY: tools test up down smoke release

tools:
	chmod +x bin/* tools/install-tools.sh
	./tools/install-tools.sh

test: tools
	./bin/phpunit --colors=always

up:
	docker compose up -d
	docker compose logs -f cli

down:
	docker compose down

smoke:
	docker compose run --rm --entrypoint wp cli eval-file wp-content/plugins/atoms/docker/smoke.php --allow-root --path=/var/www/html

release:
	rm -rf build dist/abutwins-invent.zip
	mkdir -p build/atoms dist
	cp atoms.php uninstall.php composer.json build/atoms/
	cp -r src templates assets build/atoms/
	cd build && zip -r ../dist/abutwins-invent.zip atoms -x "*.DS_Store"
	rm -rf build
