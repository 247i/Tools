================================================================================

   File Blender Version 0.36
   Extensible File Converter and Processor

   Danny Ben Shitrit (Sector-Seven) 2011
   Homepage: http://sector-seven.net
   Email:    db@sector-seven.net

================================================================================

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT OF THIRD PARTY RIGHTS. 
  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
  OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE 
  USE OR OTHER DEALINGS IN THE SOFTWARE.

================================================================================


--------------------------------------------------------------------------------
  INTRODUCTION
--------------------------------------------------------------------------------

  File Blender is an extensible and customizable file conversion and processing 
  tool.
  
  It uses external command line programs to convert or otherwise process files 
  that are being dropped onto the interface.
  
  You can easily extend its functionality by adding any program that supports
  command line arguments to its Actions folder, along with a simple 
  configuration file that tells Flie Blender which files should be handled by
  each action and how.
  
  File Blender requires no installation. The application itself is built of a
  single executable and a configuration file.
  
  File Blender is freeware and was developed with AutoHotkey 
  (http://www.autohotkey.com)

  
  
--------------------------------------------------------------------------------
  GETTING STARTED
--------------------------------------------------------------------------------

  The default File Blender download comes with several Action packages already
  configured and fully functional. 
  
  To see how it works:
  
  1. Drag an image file or an MP3 file onto the interface (you may drop several 
     files at once).
  2. Depending on the file type you have dropped, File Blender will show you 
     an additional menu with options (Actions). Press one of these actions to 
     continue.
  3. Some actions may provide you with further options. For example, if you 
     drop an image and choose the Convert... option, you will be prompted to 
     select an output format.
     
  To see a list of supported file formats and for more options, right click
  the main interface.
     


--------------------------------------------------------------------------------
  ADDING / EDITING ACTIONS
--------------------------------------------------------------------------------
  
  All the actions that File Blender can perform are located in the Actions 
  folder.
  Each sub folder contains configuration files (named like "MP3 to WAV.b.ini").
  
  When the Actions menu is open, you may right click the action button to gain
  quick access to the configuration file.
  
  A typical configuration file may look like this:
  
    [action]
    name            =Convert Image
    acceptFormat    =JPG,BMP,GIF,PNG
    acceptMulti     =true
    acceptSingle    =true
    outputTo        =out
    commandLine     ="~Var:ThisDir~\exe\i_view32.exe "~Loop:InFilename~" 
                     "out\~Loop:NameNoExt~.~Gui:SelectFormat(JPG,PNG)~"
  
  For a deeper understanding on how to set up your own actions, open the Guide
  file in the Actions\_sample folder.
  
  If you are creating an action package that you think may interest others, or
  if you would like to see any other type of processing/conversion provided, 
  please contact me.

  

--------------------------------------------------------------------------------
  ACTION PACKAGES (PLUGINS)
--------------------------------------------------------------------------------

  File Blender comes with some actions already configured and ready to use.
  If you wish to remove any of these actions, simply delete its folder or file
  from the Actions folder.
  
  You may also download a plain (no actions) version on the File Blender 
  homepage.
  
  õ Image Conversion - Package: IrfanView
    This Action package provides image conversion functionality.
    Supports BMP, PNG, GIF, JPG, TIF and more
    
  õ Audio Conversion - Packages: OGG, FLAC, Lame MP3, More Audio
    These packages provide conversion to and from OGG, FLAC and MP3
    
  õ PDF/TIFF Split and Join - Packages: PDFtk, IrfanView
    These packages provide support for splitting multipage PDF/TIFF files and 
    for joining single PDF/TIFF files into a multipage document.
    
  õ JS/CSS Minification and Obfuscation - Packages: JSMIN, YUI Compressor
    These packages compact your CSS and JavaScript file, and optionally make
    your JavaScript less readable to protect your code.
    
    
    
--------------------------------------------------------------------------------
  FILE BLENDER IN OTHER LANGUAGES
--------------------------------------------------------------------------------
  
  File Blender may be translated to other languages. See the lang folder for
  more information and more languages.

    
    
--------------------------------------------------------------------------------
  THIRD PARTY LICENSE NOTE
--------------------------------------------------------------------------------

  The default File Blender distribution comes with several third party command
  line executables.
  If you intend to use it for commercial purposes, please refer to the license
  agreement of these programs.
  A link to the homepage of each Action package is provided in the Actions 
  folder.


--------------------------------------------------------------------------------
  REVISION HISTORY
--------------------------------------------------------------------------------

  0.36 2016 09 04
    Fixed  : Ability to use parentheses in gui functions
             ~Gui:Select(Audio,Yes[],No[hello()])~
    Fixed  : Dragging the main window when action menu was open caused an 
             error.
    Changed: Action button text alignment can now be configured.
    Added  : Ability to set GUI width.

  0.35 2016 03 25
    Added  : Greek translation file (by geogeo.gr).

  0.34 2016 03 03
    Added  : Polish translation file (by Marek Bogacz).

  0.33 2011 08 06
    Added  : Spanish translation file (by Marcelo Camacho Moreno).
    Added  : Dutch translation file (by Rens Klaverstijn).
    Changed: FFMPEG's Extract Audio to MP3 now accepts M4A files.
    Changed: FFMPEG's Extract Audio to MP3 now asks for bitrate.

  0.32 2011 06 17
    Added  : M4A/AAC to WAV/MP3 using FAAC (FAAD).

  0.31 2011 05 09
    Added  : PNG Optimizer.

  0.30 2011 04 02
    Added  : ASF to any other video format, using ffmpeg.

  0.29 2011 02 23
    Changed: Lame MP3 action now supports MP3 to MP3 conversion.
    Added:   Create Animated Gif action using Gifsicle
    Changed: Minor changes in YUI JS/CSS actions

  0.28 2011 02 08
    Updated: ffmpeg to version SVN-r18709 (MP4 to AVI conversion did not work
             properly with other build).
    Added  : Turkish translation (by Ismail Tuzun).
    Removed: Frame rate parameter from toXvidAVI and toXvidMP4 actions

  0.27 2011 01 28
    Added  : HTML/XML Tidy action (thanks Ruby).
    Added  : x264 video conversion action (thanks *a lot* Ruby).
    Added  : showConsole option in the action file format (thanks Ruby).
    Changed: Format of help page.
    Added  : TTF to EOT conversion action.
    Added  : Ability to add escaped commas to GUI elements (thanks Ruby). See
             Actions\_sample\Guide.b.ini for details.
    Added  : ~Var:ThisDrive~ variable (thanks Ruby)
    Added  : Swedish translation file (by Ake Engelbrektson)
    Updated: FFmpeg to 0.5 (thanks Ruby).

  0.25 2011 01 07
    Added  : Support for Monkey's Audio APE format (APE and More Audio packages)
    
  0.24 2010 12 11
    Changed: Minor changes in MySecret action
    Updated: ffmpeg to version 16043 - newer versions had troubles (thanks Ruby)
    Updated: All ffmpeg video actions (thanks Ruby)
    Added:   Italian translation (by Fabrizio Conti)
    Updated: Lame MP3 version to 3.98.4 (thanks Ruby)

  0.23 2010 12 08
    Added  : File encryption / decription using MySecret (thanks Ruby)

  0.22 2010 05 14
    Added  : French translation file (by Louis Parmentier).

  0.21 2010 04 29
    Changed: All English strings are now placed in the INI file, for easy 
             localization.

  0.20 2010 04 16
    Added  : Video conversion support with FFmpeg.
    Change : Status dialog to contain up to two lines.
    Added  : Additional image actions.

  0.18 2009 10 19
    Added  : Image resize action with IrfanView
    Updated: Lame version to 3.98.2

  0.17 2009 07 21
    Added  : JS Minification with JSMIN.
    Added  : JS Minification and Obfuscation with YUI Compressor.
    Added  : CSS Minification with YUI Compressor.
    Changed: Supported Actions HTML format.

  0.16 2009 07 18
    Added  : Welcome message on the first run.
    Added  : Access to Readme on main menu.

  0.15 2009 07 10
    Added  : showFolder key in Action configuragion syntax to prevent output 
             folder from showing when action is done.
    Added  : Ability to specify a different label and return value in ~Select~
             tag.
    Changed: OGG and MP3 command lines to now allow quality selection.
    Fixed  : PDF join did not work, used an older command line syntax.

  0.14 2009 07 09
    First version

--------------------------------------------------------------------------------
