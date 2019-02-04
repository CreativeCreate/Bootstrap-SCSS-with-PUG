# DEV Exercise

**Time: 4+ Hours**

**Bootstrap 4, SCSS, GULP, PUG**

## DEV Work-flow Explained 

### Assets from Photoshop
I have used Photoshop "GENERATOR" function to directly create assets. Assets are named, optimized and directly placed in Dev > images > assets folder, where task watch is running. I find this method faster than image slicing.  

### SCSS and Bootstrap
I combined theme specific SCSS files with "Bootstrap 4 SASS". Even though this project is not complex enough for such architecture, I find it's faster and easier to customize Bootstrap.  

* Used structures of atomic design where possible.
* Made CSS and Bootstrap as the primary solution to as many possible scenarios.
* Used BEM naming convention for css classnames (blockName__elementName--modifierName)

### Moulder HTML with PUG
I used PUG to modularize HTML components. Since the nature of this project (a test), I used pure HTML instead pug shorthand writing.  

### Gulp Tasks
* CSS/JS tasks : watch, concatenate, compile, prefix, minify, generate source-map    
* Images : watch, compress
* HTML : watch, compile pug, BrowserSync


```sh
$ git clone https://github.com/CreativeCreate/Bootstrap-SCSS-with-PUG.git
```
