var texts = [
    "Python is an easy to learn, powerful programming language. It has efficient high-level data structures and a simple but effective approach to object-oriented programming. Python's elegant syntax and dynamic typing, together with its interpreted nature, make it an ideal language for scripting and rapid application development in many areas on most platforms.",
    "Java is a high-level programming language originally developed by Sun Microsystems and released in 1995. Java runs on a variety of platforms, such as Windows, Mac OS, and the various versions of UNIX.",
    "C++ is a general-purpose programming language created by Bjarne Stroustrup as an extension of the C language. It supports both procedural and object-oriented programming, giving developers fine-grained control over system resources and memory, which makes it a popular choice for game engines, operating systems, and performance-critical applications.",
    "C# is a modern, object-oriented programming language developed by Microsoft as part of its .NET platform. It combines the power of C++ with the simplicity of Visual Basic, and is widely used for building desktop applications, web services, games with Unity, and enterprise software."
];

function showTab(index) {
    var tabs = document.getElementsByClassName("tab");

    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
    }

    tabs[index].classList.add("active");
    document.getElementById("tab-content").textContent = texts[index];
}

showTab(0);
