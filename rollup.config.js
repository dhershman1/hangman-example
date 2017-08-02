import buble from 'rollup-plugin-buble';
import multiEntry from 'rollup-plugin-multi-entry';
import uglify from 'rollup-plugin-uglify';

export default {
	entry: 'assets/js/*.js',
	moduleName: 'hangman',
	format: 'umd',
	plugins: [
		buble(),
		multiEntry(),
		uglify()
	],
	dest: 'dist/hangman.umd.js'
};
