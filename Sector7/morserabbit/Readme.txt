--------------------------------------------------------------------------------

  MorseRabbit 0.21
  Learn Morse Code
  Danny Ben Shitrit 2011
  ----------------------------------------------------------------------------
  Homepage: http://sector-seven.net/
  Email   : db@sector-seven.net
  ----------------------------------------------------------------------------
  Compiled Windows executable and source code are available on the homepage.
  ----------------------------------------------------------------------------
  
  License:
  This work is licensed under a 
  Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
  http://creativecommons.org/licenses/by-nc-sa/3.0/

--------------------------------------------------------------------------------


  INTRODUCTION
  ----------------------------------------------------------------------------
    
    MorseRabbit is a small utility designed to help you learn to tap and 
    understand Morse Code.
    
    MorseRabbit has two training modes, each with 5 levels of difficulty:
    • Normal Mode: You are provided with a morse code sequence (both the visual
      and audible representation) and are expected to type in the correct word 
      in time.
    • Reverse Mode: You are provided with an alphabetic sequence or a word, 
      and are expected to tap the corresponding morse code.
      
    After you master the 5 training levels, you can continue your morse 
    education with these lessons:
    • Lesson 6 - Words
      This lesson uses dictionary words instead of random letters.
      
    • Lessons 7 and above
      In these lessons you practice aspects of morse code that are beyond just
      knowing the alphabet. You can practice Prosigns (like the well known 
      SOS), abbreviations and Q-Codes.
      

      
  INSTALLATION
  ----------------------------------------------------------------------------
    
    MorseRabbit requires no installation.
    If you have downloaded the compiled version, extract the ZIP archive to a 
    new folder and run the MorseRabbit executable. 
    
    To uninstall, delete all files.



  USAGE
  ----------------------------------------------------------------------------

    If you want to: Tap a morse sequence to see what word it generates
                Do: - Stop the training if it is running.
                    - Start tapping the Spacebar.
                    - You may adjust the speed slider, to tell MorseRabbit how 
                      to listen to your taps.
                    
    If you want to: Train in understanding morse code.
                Do: - Make sure the Reverse Training checkbox is clear.
                    - Select a difficulty level.
                    - Press the Start button*.
                    - Now, type the letters representing the morse code you 
                      hear.
                      
    If you want to: Train in tapping morse code.
                Do: - Make sure the Reverse Training checkbox is checked.
                    - Select a difficulty level.
                    - Press the Start button*.
                    - Now, use the spacebar to tap the morse code for the 
                      letter. Short press for a DIT, long press for a DAH**.
                    - Pressing backspace, left arrow or delete, will mark the
                      word as failed.
                      
    *   Note that if you change level and press Start, MorseRabbit will reload 
        itself, in order to re-generate the help table.
      
    **  Note that the Speed slider is considered when you tap the spacebar.
        When it is moved to the right, you are expected to tap the code faster.      
      
      
      
  INTERFACE
  ----------------------------------------------------------------------------

    • Lesson Dropdown List
      Select a lesson to practice:
      Lesson 1 will generate 1 character, that requires only one morse tap
      Lesson 2 will generate 2 characters, that require 1 or 2 taps
      Lesson 3 will generate 3 characters, that require 1, 2 or 3 taps
      and so on.
      
      Lesson 6 (Words) will generate a word from the dictionary or a number.
      Words are taken from the Words.txt file
      
      Lessons 7 and above will generate a phrase from any of the files in the
      "words" folder (exclusing the dictionary file "Words.txt")
      
    • Morse Sound Dropdown List
      Select the sound type that is used (in all modes).
 
    • Speed Slider
      Move this slider to the left for a slower training, and to the right for
      a faster training.
      This slider may be moved during training.
      
    • Help Dropdown List
      Select the displayed help type and reloads (see below).
      
    • Reverse Training Checkbox
      When enabled, you will be requested to tap the morse code (using Space) 
      instead of typing the alphabetic word. See Usage above.
      
    • Blind Checkbox
      When enabled, will not display the morse code when in Normal Training
      mode. Has no effect on Reverse Training or on free morse tapping.
      
    • Start/Stop Button
      Starts/Stops the training. 
      Also Ctrl+Enter to start/stop.
      Also ESC to stop.
      
      
      
  LEVEL-SENSITIVE MORSE HELP
  ----------------------------------------------------------------------------
  
    You may choose to view one of two types of helpful information during your
    training.
    • Select the Tree help to show a morse tree. 
    • Select the Table help to show a table of letters and codes.
    
    In both cases, only the letters that are needed (according to the 
    difficulty level you have selected) will be displayed.
    
    When you feel that you no longer need any help, you may disable the help
    area on the interface.
    
    In lessons 7 and above, there is only one type of help, which will show
    the phrase and its morse code or abbreviation.

                      

  MORSE CODE LINKS
  ----------------------------------------------------------------------------
    Morse Code on Wikipedia
    http://en.wikipedia.org/wiki/Morse_code
  
    Prosigns on Wikipedia
    http://en.wikipedia.org/wiki/Prosigns_for_Morse_code    
    
    Q Code on Wikipedia
    http://en.wikipedia.org/wiki/Q_code
    

    
  REVISION HISTORY
  ----------------------------------------------------------------------------
  
    0.21 2008 12 15
      Added  : Some lessons.
      Fixed  : Minor cosmetic glitch.

    0.20 2008 12 14
      Changed: Location of sound files and dictionary file.
      Removed: Files are not longer installed with FileInstall.
      Added  : Support for additional morse phrase files.
      Added  : Phrase lessons - Punctuations, Prosigns, Abbreviations, Q-Codes.

    0.18 2008 12 13
      Changed: Increased the silence of the DahKnock.wav file.
      Changed: We will now immediately reload when changing levels.

    0.17 2008 12 13
      Added  : Morse sound selection.
      Added  : Blind mode (hides the visual morse code).
      Changed: Tapping sounds can now use either knocks or beeps (thanks 
               menaphus).
      Changed: In Reverse Mode, we are no longer strict about the length of
               the DAH.
  
    0.16 2008 12 13
      Changed: In reverse mode, the characters that are still to be typed will
               now also be displayed in the main answer area.

    0.15 2008 12 13
      Fixed  : some fixes.
      Added  : Ability to just tap a word using space, to see the result.
      Added  : Reverse Training mode - you are provided with a word, and are
               expected to tap in the morse sequence.
    
    0.13 2008 12 12
      First public release

