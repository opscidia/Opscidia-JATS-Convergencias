# Opscidia-JATS
Code for the OJS 3.2.1-4 release, to fix some bugs with JATS Parser for automatic rendering of articles in JATS XML format and displaying them on article landing page.

## Plugins needed
- Custom Header Plugin
- JatsParser branch stable_3_2_1

## Installation
Execute :
<code>cd /var/www/html && git clone https://github.com/opscidia/Opscidia-JATS.git betterOJS && sudo chown -R www-data:www-data betterOJS && sudo chmod -R 557 betterOJS</code>
<br>Then, edit the php file with :<br>
`sudo nano /var/www/html/betterOJS/file_id_finder.php`<br>
Replace the following with your own data :<br>
<code>$db_username = '<your_mysql_username>'; # MySQL Username
$db_password = '<your_mysql_password>'; # MySQL Password
$db_host = 'localhost'; # MySQL Server // localhost by default, if your database is hosted elsewhere ajust accordingly
$db_name = '<your_ojs_database_name>'; # MySQL Database name</code><br>
Next, edit the JavaScript file :<br>
`sudo nano /var/www/html/betterOJS/images_fixer.js`<br>
Replace the following value accordingly :<br>
<code>const journalName = "<your_journal_name>";</code><br>
<hr>
Finally, in the custom header plugin settings, type :
  <code><script src="/betterOJS/images_fixer.js" defer></script></code>
