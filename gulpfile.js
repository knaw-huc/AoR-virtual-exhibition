// npm i
// npm audit fix --force

// npm install -g google-spreadsheet-to-json
// gulp getj
// gulp convHtml

// gsjson 1k2EgdCT3iSo_8hGwt_dOQvKwEpBcTIFe4wefljkrb5Q >> content/data.json -b

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var handlebars = require('gulp-compile-handlebars');
var useref = require('gulp-useref');
var replace = require('gulp-replace');
var exec = require('child_process').exec;
var each = require('gulp-each');
var dom  = require('gulp-dom');
var mammoth = require("mammoth");
var writeFile = require('write-file');
//var docxHtmlConverter = require('gulp-docx-converter');

var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
const using = require('gulp-using');

var options = {
    batch : ['./src/components', './content/html/']
    }


var dst =       '_dist/';
var prebuild =  'prebuild';
var fScss=      'src/scss/**/*.scss';
var fHtml=      'src/**/*.html';
var fHtmlNot=   ['!src/components/nav-top.html','!src/components/nav-1.html','!src/components/nav-2.html','!src/components/nav-3.html','!src/components/nav.html','!src/components/nav-manuscripts.html'];
var fImages=    ['src/images/**/*', '!src/images/oud/**/*'];
var fJs=        'src/js/**/*';
var fJson=      ['src/**/*.json', 'content/**/*.json'];
var fMd=        'content/**/*.md';
var allImgStr = 'not working';


var siteJson = require('./content/data/sites.json');
var copyPath = require('./content/data/copyPath.json');

// Create HTML
function createHtml(fileName) {
  mammoth.convertToHtml({path: copyPath.copyDestination+fileName+".docx", outputDir: "content/html/"})
      .then(function(result){
          htmlOut = result.value; // The generated HTML
          messages = result.messages; // Any messages, such as warnings during conversion
          //console.log(htmlOut);
          fs.writeFileSync('content/html/'+fileName+'.html', htmlOut)
      })
}

// gulp convHtml
gulp.task('convHtml', function (done) {
  var htmlOut='qqq';
  var messages;
  fs = require('fs');

  for(var ii=0; ii<siteJson.length; ii++) {
      page = siteJson[ii];
      fileName = page.docx_file;
      createHtml(fileName);
      }
done();
});



gulp.task('browserSync', function(done) {
  browserSync.init({
    //proxy: "http://localhost:8888/wp-huc"
    server: {
      baseDir: dst
    },
    browser: ["google chrome"], //, "firefox"
  })
  done();
})

function reload(done) {
  browserSync.reload();
  done();
}


// clear Json files en get new data from google docs
gulp.task('cleanJson', function () {
    return gulp.src(['content/data/sites.json'], {read: false, allowEmpty: true})
        .pipe(plumber())
        .pipe(clean())
});

gulp.task('getJSite', function (cb) {
  exec('gsjson 1Ss17Y8N7xWnS2wqRzsSumUrlaNmfZXqm3p7ynLhEsS0 >> content/data/sites.json -b', function (err, stdout, stderr) { cb(err); });
})



gulp.task('getj', gulp.series('cleanJson', 'getJSite',  function (done) {
  done();
}))

// gulp getj
// site   1Ss17Y8N7xWnS2wqRzsSumUrlaNmfZXqm3p7ynLhEsS0


// npm mammoth d1h1.docx output.html


gulp.task('clean', function () {
    return gulp.src(dst, {read: false, allowEmpty: true})
        .pipe(plumber())
        .pipe(clean())
});



gulp.task('nav', function(done) {
  var navs = ["top", 1, 2, 3, "manuscripts"];
  var navItems = {"items":[]};

  for(var i=0; i<navs.length; i++) {
    for (var j = 0; j < siteJson.length; j++) {
      if (siteJson[j].theme == navs[i]) {
        navItems.items.push(siteJson[j]);
      }
    }

    gulp.src('./src/templates/nav.html') //
        .pipe(plumber())
        .pipe(handlebars(navItems, options))
        .pipe(rename('nav-' + navs[i]+ ".html"))
        .pipe(gulp.dest('src/components/'));

    navItems = {"items":[]};

  }


    //console.log(navItems);
   done();
});



gulp.task('sass', function(){
  return gulp.src('./src/scss/*')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(dst+'css'))
});




gulp.task('buildFromTemplates', function(done) {
  var page;
  var fileName;
  var template;
  var messages;
  var pageId;

  for(var i=0; i<siteJson.length; i++) {
      page = siteJson[i];
      fileName = page.file_name; //.replace(/ +/g, '-').toLowerCase();
      template = page.template_file;
      //pageId = page.id;

      gulp.src('./src/templates/'+template+'.html')
          .pipe(plumber())
          .pipe(handlebars(page, options))
          .pipe(rename(fileName + ".html"))
          .pipe(replace('|', '<br>'))
          .pipe(each(function(content, file, callback) {
            //console.log(content);
            var newContent = content.replace("in", "innnnnnnnnnn");
            callback(null, newContent);
            }))
          .pipe(useref())
          .pipe(gulp.dest(dst))
          .pipe(browserSync.stream());
  }
  done();
});


gulp.task('copyImg', function(){
  return gulp.src(fImages)
    .pipe(plumber())
    .pipe(gulp.dest(dst+'images'))
});




gulp.task('build',
  gulp.series('clean', 'nav', 'sass', 'buildFromTemplates', 'copyImg',
  function(done) {
      done();
  }
));


gulp.task('watch', function () {
  gulp.watch(['src/**/*.html', '!src/components/nav-top.html','!src/components/nav-1.html','!src/components/nav-2.html','!src/components/nav-3.html','!src/components/nav.html','!src/components/nav-manuscripts.html', 'src/scss/**/*.scss','src/js/**/*', 'src/**/*.json', 'content/**/*.json'], gulp.series('build')); //, fHtmlNot, fScss, fJs, fJson, fMd
});



gulp.task('default',
  gulp.series('build', gulp.parallel('browserSync','watch'),
  function(done) {
      done();
  }

));


function ifEmp(input, pre, post) {
  if(input != undefined) {
    return pre+input+post;
  }else {
    return '';
  }
}


function handleImage(fileName) {
  return '<img src="images/'+fileName+'" />'
}
