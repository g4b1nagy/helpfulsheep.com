===========================================================================
categories: ''
date: 2015-04-01 22:13
description: ''
icon: ''
ogimage: ''
script: ''
style: ''
template: page.html
title: !!python/unicode 'Cel mai tutorial de Hadoop'
===========================================================================

Da, am reușit să fac întreaga nebunie să meargă. Instrucțiuni mai jos:



## Setup-ul meu ##

* [Ubuntu 14.04](http://releases.ubuntu.com/14.04/)
* [VMware Player 7.1.0](http://www.vmware.com/products/player/playerpro-evaluation.html)
* OpenJDK 1.7.0_65
* [Eclipse Indigo](https://eclipse.org/downloads/packages/release/Indigo/SR2)
* [VM-ul, Hadoop-ul și plugin-ul de Eclipse](https://www.dropbox.com/sh/8zxvh3cfiuw05xg/AABF2iSJdj3pV2W0cq4g1rava?dl=0) (da, sunt cele de pe rețeaua din campus)

Evident, toată chestia ar trebui să meargă la fel de bine și pe alte setup-uri... teoretic.



## Cum să mașină virtuală ##

* se dezarhivează `hadoopvm.rar` și apoi se Open și Play din VMware Player
* yes, You Copied It
* login cu `root - root`
* fiindcă VM-ul a rulat înainte pe alt PC, trebuie reconfigurat LAN-ul

//code bash
yast lan

# apar două plăci de rețea - una cu IP Address "Not configured",
# și una cu "DHCP"
# prima trebuie configurată, a doua e cea de pe PC-ul vechi și
# se poate deci șterge

# se navighează cu Tab + scurtături

Alt + i    # pentru Edit

# selectat Dynamic Address DHCP (dacă nu e deja selectat)

Alt + n    # pentru Next
Tab
Down arrow
Alt + t    # pentru Delete
Alt + o    # pentru OK

ifconfig    # de notat IP-ul mașinuței (eth0)

# felicitări, ai o mașinuță slave funcțională :)
//code



## Cum să rețea campus ##

* după ce te conectezi la rețeaua din campus, fie prin WiFi, fie prin cablu

//code bash
# trebuie să adăugăm IP-ul mașinuței la lista de slave-uri a
# master-ului din campus

ssh root@172.30.106.33    # parola e root
cd hadoop
echo "xxx.xxx.xxx.xxx" >> conf/slaves

# mașinuța are salvată cheia publică a master-ului în
# /root/.ssh/authorized_keys deci putem testa dacă
# masterul se poate într-adevăr conecta la ea

ssh root@xxx.xxx.xxx.xxx
exit


# pe mașinuță
# ștergem fișierele temporare
rm -rf /tmp/hadoop-root/*


# pe master
# formatăm HDFS-ul
bin/hadoop namenode -format

# pornim componentele
bin/start-all.sh

# procesele pornite mai sus ar trebui să apară și în slave-uri
# când executăm comanda jps

# rulăm unul din exemple; cu un pic de noroc, ar trebui
# să facă mega team work distribuit

bin/hadoop jar hadoop-0.20.2-examples.jar pi 10 1000

# dacă se plânge că /output directory există deja

bin/hadoop fs -rmr /output
//code



## Cum să Eclipse ##

* se copiază `hadoop-eclipse-plugin-0.20.3-SNAPSHOT.jar` în `eclipse/plugins`
* se dezarhivează `hadoop-0.20.2.tar.gz` într-un loc cu verdeață *
* Window => Open Perspective => Other => Map/Reduce
* File => New => Project => Map/Reduce Project => Next
* Project Name = "WordCount"
* Configure Hadoop install directory => Browse => Select * => OK => Finish (dacă faci asta nu mai trebuie să adaugi jar-urile manual în Build Path)
* New => Class
* Name = "WordCount"
* Finish
* se copiază codul [de aici](WordCount-local.java)
* click dreapta în tab-ul Map/Reduce Locations => New Hadoop location
* Location name = "mastercampus"
* Map/Reduce Master Host = "172.30.106.33"
* Map/Reduce Master Port = "9001"
* DFS Master Port = "9000"
* User name = "root"
* Finish
* click dreapta pe DFS Locations din Project Explorer => Refresh
* click dreapta pe "mastercampus" din tab-ul Map/Reduce Locations => Edit Hadoop location => Advanced parameters
* se înlocuiesc toate aparițiile username-ului tău (în cazul meu, "gabi"), cu "root" => Finish
* Run => Run As => Run on Hadoop

Problema e că Eclipse-ul va rula WordCount-ul doar pe mașina locală. Pentru a putea rula codul în mod distribuit, proiectul trebuie salvat ca jar, copiat pe master și rulat din linia de comandă. Also, master-ul are Java 1.6 instalat.

* se copiază codul [de aici](WordCount-distributed.java)
* click dreapta pe proiect => Build Path => Configure Build Path => Libraries => JRE System Library => Edit
* Execution environment = "JavaSE-1.6..." => Finish => OK
* click dreapta pe proiect => Export => Runnable JAR file => Next => pick destination * => Finish
* pe host: `scp */project.jar root@172.30.106.33:hadoop`
* pe master: `bin/hadoop jar project.jar WordCount`



## Concluzii ##

Toată treaba asta e scrisă cam din amintiri așa că probabil lipsesc pași. Lăsați-mi comment-uri cu indicații / probleme / soluții și o să updatez pagina.

It ain't perfect but <img style="vertical-align: -17px;" src="its-something.jpg" alt="it's something!">

<br>
<br>






## Azure - de la Mihai Turcu (<a href="http://mihaiturcu.ro/" target="_blank">mihaiturcu.ro</a>), citire: ##

Pentru labul cu azure, in principiu ar trebui sa functioneze exact acelasi cod, fara prea multe schimbari.
Daca luati ca date de intrare toate fisierele dintr-un anumit input path, ca in secventa de cod de mai jos, sa va asigurati ca folositi cai relative:

//code bash
FileInputFormat.setInputPaths(job, new Path("/user/root/input"));
FileOutputFormat.setOutputPath(job, new Path("/user/root/output"));
//code

Recomand sa folositi acelasi input path ca si cel din liniile de mai sus deoarece o sa va vina mai usor sa ma urmariti.

Pasul 1) Uploadati jar-ul si input file-urile voastre pe clusterul de hdinsight din azure.
Ca sa puteti face asta, va duceti din panoul de control azure in dashboard-ul pentru cluster -> all settings -> Secure Shell -> retineti host-name-ul.

<a href="http://i.imgur.com/wRXpUfw.png"><img class="img-full" src="http://i.imgur.com/wRXpUfw.png"></a>

Va descarcati un client de ftp/sftp/scp precum WinSCP, completati datele ca in imaginea de aici:

<a href="http://i.imgur.com/8sI1Kk2.png"><img class="img-full" src="http://i.imgur.com/8sI1Kk2.png"></a>

folosind in campul de username
numele de utilizator definit la crearea clusterului, pentru SSH (v-o cerut de 2 ori un nume si o parola, mai specific al 2 lea set de date va trebuie).
Trageti in fereastra din dreapta jar-ul si input file-urile pentru a le face upload:

<a href="http://i.imgur.com/AIYSuY7.png"><img class="img-full" src="http://i.imgur.com/AIYSuY7.png"></a>

Pasul 2) Creati input path-ul pe DFS si uploadati acolo fisierele de input.
Faceti ssh pe masina respectiva folosind aceleasi date si apoi rulati urmatoarele comenzi.

//code bash
sudo su -
cd /home/userultaudessh
hadoop fs -mkdir /user/root/input
hadoop fs -put numefisier /user/root/input/ (da are un slash la urma)
hadoop fs -ls /user/root/input/ (doar pentru a verifica existenta datelor in dfs)
//code

<a href="http://i.imgur.com/je8vTBQ.png"><img class="img-full" src="http://i.imgur.com/je8vTBQ.png"></a>

Pasul 3) Rulati jar-ul
hadoop jar /path/to/jar argumentsIfNeeded (apare si in poza de mai sus cum l-am rulat)

Daca o sa rulati de mai multe ori jar-ul respectiv, probabil se va plange ca exista deja date in directorul de output.
Pentru a curata directorul de output rulati comanda:

//code bash
hadoop fs -rm -r /user/root/output/
//code

<a href="http://i.imgur.com/PuSEQjP.png"><img class="img-full" src="http://i.imgur.com/PuSEQjP.png"></a>

(aici exemplu de rulare ok)

Dupa ce ati rulat, regasiti rezultatele in dfs in /user/root/output/part-something.
Rulati:

//code bash
hadoop fs -ls /user/root/output
# Vedeti in ce fisier vi-s rezultatele apoi incercati sa le vizualizati folosind comanda
hadoop fs -cat /user/root/output/part-something | less (cautati cu /ceva)
//code

O alta optiune e sa va aduceti fisierul de output pe filesystemul masinii si de acolo sa il deschideti cu ce vreti.

<a href="http://i.imgur.com/1hmEY6Z.png"><img class="img-full" src="http://i.imgur.com/1hmEY6Z.png"></a>

Puteti sa il deschideti din WinSCP cu cine stie ce editor aveti pe masina locala daca optati pe varianta asta.

Have fun.

<br>
<br>

<div id="disqus_thread"></div>
<script type="text/javascript">
    /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
    var disqus_shortname = 'helpfulsheep'; // required: replace example with your forum shortname

    /* * * DON'T EDIT BELOW THIS LINE * * */
    (function() {
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    })();
</script>
<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
