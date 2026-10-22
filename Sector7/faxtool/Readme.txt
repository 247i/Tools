================================================================================

  FaxTool 0.20
  Tiny TIFF/PDF Splitter / Joiner
  
  Danny Ben Shitrit (Sector-Seven) 2011
  
  License:
  This work is licensed under a 
  Creative Commons Attribution 3.0 Unported License.
  http://creativecommons.org/licenses/by/3.0/

================================================================================

  Homepage: http://sector-seven.net/software/faxtool
  Contact:  db@sector-seven.net
  
================================================================================

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT OF THIRD PARTY RIGHTS. 
  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR 
  OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE 
  USE OR OTHER DEALINGS IN THE SOFTWARE.
  
================================================================================

  ----------------------------------------------------------------------------
  INTRODUCTION
  ----------------------------------------------------------------------------
  
  FaxTool is a simple freeware utility for splitting and joining (merging) 
  TIFF and PDF files. Simply drag your files onto the interface to split or 
  join.
  
  It is a single EXE, and requires no installation.
  
  
  ----------------------------------------------------------------------------  
  TECHNICAL NOTES
  ----------------------------------------------------------------------------

  The intended design approach was to provide a quick helper utility for sending 
  and receiving fax messages, which usually come in TIFF and PDF format.
  
  FaxTool was developed using AutoHotkey (http://www.autohotkey.com) for the 
  wrapping interface, and is using command line executables for converting the 
  files.
  
  The command line executables are already included and compiled into the 
  FaxTool.exe file so you do not need to download them separately.
  
  The first time you run FaxTool, it will extract these files to your Windows 
  temporary folder:
  • pdftk.exe
  • i_view32.exe
  
  When Splitting - the individual pages will be placed in the same folder as the
  input file, sequentially named.
  
  When Joining - the output file is named after the first file in the list, 
  followed by "_merged".
  
  
  ----------------------------------------------------------------------------
  CREDITS AND LICENSE NOTE
  ----------------------------------------------------------------------------  
  
  FaxTool is using these command line executables to do the actual conversion.
  If you intend to use it for commercial purposes, please refer to the license
  agreement of these tools.
  
  • IrfanView (http://www.irfanview.com/) - for TIFF conversion
  • PDFTK (http://www.accesspdf.com/pdftk/) - for PDF conversion
  
--------------------------------------------------------------------------------
  
  Revision History:
  
  0.20 2009-12-19
    Changed: Split files will now use the same name as the original combined 
             filename, followed by number.
    Changed: Joined file will now use the same name as the first file in the list 
             followed by "_merged".
  
  0.12 2009-07-07
    Changed: Now using IrfanView to do TIFF conversion. This allows for a 
             multipage TIFF join.
  
  0.11 2009-07-06
    Added  : Support for PDF split/merge using pdftk.
    Canged : Name from TIFF Tool to FaxTool.
  
  0.10 2009-07-05
    First version.
    
--------------------------------------------------------------------------------
