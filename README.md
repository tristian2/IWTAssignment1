# IWTAssignment1
internet web technologies using xml, xslt, ajax and others




  Coursework for Internet and Web Technologies module (2013/14)

------------------------------------------------------------------------

The purpose of this coursework is to help you learn about using
Javascript and the DOM to process XML documents. The coursework will be
assessed and counts 10% of the final mark for this module.


    The task

The XML document you will be working with is |remakes.xml|, which is an
XML representation of information about remakes of films. For each
remake (represented by a |remake| element), the file contains
information about its title (|rtitle|), year it was made (|ryear|), the
title and year of the original (source) film (|stitle| and |syear|), and
a fraction (|fraction|) representing how closely the remake follows the
original.

The product of the coursework should be a HTML page which a user can use
to query information about film remakes. In other words, the HTML page
should read the file and provide an interface through which the user can
query the data. You should use JavaScript, XSLT and HTML forms to
implement your solution, which should work with /both/ Firefox /and/
Chrome. The shortest solution will probably be to use XSLT to perform
the selections and format the results. The techniques you need to use
are discussed in the Extensible style language
<http://www.dcs.bbk.ac.uk/~ptw/teaching/IWT/xsl/toc.html> and
Client-side processing
<http://www.dcs.bbk.ac.uk/~ptw/teaching/IWT/client/toc.html> parts of
the course. Extra information is given below <#hints>.

 1. Develop an XSLT stylesheet which will transform the XML data into an
    HTML table with entries for title, year, original title, original
    year, and fraction. The table should have an appropriate header row.
    This stylesheet can be used (and modified programmatically) in
    solving the next part of the coursework assignment (so it should
    produce /only/ an HTML table, not a complete HTML document).
 2. Now create a web page which will allow a user to query the data as
    follows:
     1. For each of title of remake, year of remake and fraction, the
        user should be able to enter a value (e.g. 1990) as well as an
        operator (e.g., <, =, >) and retrieve the films satisfying the
        corresponding conditions (e.g., |ryear=1990|). The user should
        be able to enter conditions for any combination of these three
        properties. If no conditions are entered, all films should be
        returned.
     2. For title of remake, the user should also be able to enter
        "contains" as an operator, along with some value. In this case,
        the system returns remade film titles where the title contains
        the value entered as a substring. For example, we might want all
        films where the title contains the string "Murder". XPath
        provides a function |contains| which takes two arguments: an
        XPath expression and a string to search for.
     3. For title of remake, the user should also be able to retrieve
        the films where the remake has the same title as the original.
     4. The user should be able to specify the property (title, year,
        original title, original year, and fraction) by which the
        returned films should be sorted. Only ascending order (the
        default) need be provided. (For information about the XSLT
        |sort| element, see the exercises for XSLT <../xsl/slide45.html>.)

For part 2, you will need to use a form. You can separate the input
region from the output region on the page by using a |div| element to
hold the output (see below). The idea is that you should use the
stylesheet developed in part 1 to produce the HTML output.

I would recommend developing your solution in stages. This is
particularly important since debugging Javascript can be very
time-consuming and frustrating. All browsers do now provide a "developer
console" or something similar which you can use to view error messages,
set breakpoints allowing you to view the values of variables, and so on.

Start by developing the stylesheet and check that it works correctly
without using Javascript. Then develop solutions for each of the other
parts above in sequence. In each case, it is probably easier to develop
a specific, less elegant solution first before trying to come up with a
more generic solution. At each stage add only small amounts of code
before retesting your solution.

The simplest way to implement part 2 is to make use of the fact that an
XSLT stylesheet is also an XML document and so can be manipulated using
JavaScript and DOM, as shown on slides 25
<http://www.dcs.bbk.ac.uk/~ptw/teaching/IWT/client/slide25.html>, to 28
<http://www.dcs.bbk.ac.uk/~ptw/teaching/IWT/client/slide28.html>.


    Handing in the coursework

The deadline for submission is /6pm on Wednesday 11th December 2013/.
Please submit the coursework via Moodle /as a single zip file/
containing a single HTML file and stylesheet. You should not submit any
instructions or explanations in a separate file. Instead, the interface
should be self explanatory and the code should be commented appropriately.

Remember that plagiarism is taken very seriously by the Department and
the College (see the relevant section in your programme booklet).
Consequently, you are required to state the following in your HTML
submission (either as a comment, or visible on the displayed page): /I
confirm that this coursework submission is entirely my own work, except
where explicitly stated otherwise. / (Of course, you are welcome to
reuse code presented during lectures.) Your submission may be submitted
to an online plagiarism detection service. The College's disciplinary
procedure will be invoked in any cases of suspected plagiarism.

The College policy with regard to late submission of coursework is
described in the MSc/MRes programme booklet. No extensions will be
granted. The cut-off date for submissions is /6pm on Wednesday 18th
December 2013/. Submissions after this date will not be marked. Those
submitted after 6pm on the 11th and before 6pm on the 18th December,
where mitigating cicumstances are not accepted, will receive a maximum
mark of 50%.


    Marking guide

Your program should be properly structured and should include comments
and some simple error checking. The user interface does not need to be
elaborate, but it should be clear to the user how to use it.

Marks will be awarded out of 20. The areas in which marks will be
awarded and the maximum mark possible in each case are as follows:
friendliness of the user interface	2
code structure and documentation	2
error handling in the code	2
part 1	2
part 2(a)	5
part 2(b)	2
part 2(c)	2
part 2(d)	3

Full marks for the first 3 items above will not be awarded if only a
partial solution is provided for part 2.

Comments on your coursework, along with the mark you were awarded,
should be returned to you within 4 weeks of the cut-off date.


    Hints and useful information

Some features of DOM and JavaScript which you might find useful are
given below (depending on the approach you take, some of the following
may not be relevant):

  * when applied to a node, |getAttribute(name)| will return the value
    of the attribute named |name| (a string or variable)
  * when applied to a node, |setAttribute(name, value)| will set the
    value of the attribute named |name| to |value|
  * remember that an element which contains text is represented in DOM
    as an element node with a child node which is a text node and has a
    value
  * |xsl:sort| is described briefly in one of the exercises
    <http://www.dcs.bbk.ac.uk/~ptw/teaching/IWT/xsl/slide45.html> of the
    XSLT part of the course
  * to reserve an area for output, you can have a part of your document
    identified for example as follows

    <div id="resultArea">
    </div>

    and then append a document fragment to this |div| element
  * to test whether two values are equal, use |===|; to test whether
    /both/ of a pair of conditions is true, use |&&|; to test whether
    /either/ of a pair of conditions is true, use ||||
  * to concatenate two strings together, use the |+| operator; so if
    |str1| contains |"Hello"| and |str2| contains |"world"|, then |str1
    + str2| will produce |"Helloworld"|
  * to test whether a string contains a given substring, you can use the
    |indexOf(.)| method of Javascript. For example,
    |myString.indexOf(mySubstring)| returns the starting index where
    |mySubstring| occurs in |myString| (starting from index 0), or
    returns -1 if |mySubstring| does not occur in |myString|.

The links on the Links to more information
<http://www.dcs.bbk.ac.uk/~ptw/teaching/IWT/client/slide30.html> page
might also be useful.


