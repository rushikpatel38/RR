(function () {
  "use strict";

  var root = document.body.getAttribute("data-root") || "./";
  var page = document.body.getAttribute("data-page") || "";

  var NAV = [
    { label: "Home", href: root + "index.html", key: "home" },
    {
      label: "Services", href: root + "services/index.html", key: "services",
      children: [
        { label: "Cloud Solutions", desc: "Migrate, secure, and optimize the cloud.", href: root + "services/cloud-solutions.html" },
        { label: "Cybersecurity", desc: "Reduce and manage cyber risk.", href: root + "services/cybersecurity.html" },
        { label: "Managed IT Services", desc: "Ongoing IT support and monitoring.", href: root + "services/managed-it.html" },
        { label: "IT Infrastructure", desc: "Networks, servers, and storage.", href: root + "services/it-infrastructure.html" },
        { label: "Digital & Application Solutions", desc: "Web, software, and integration.", href: root + "services/digital-solutions.html" }
      ]
    },
    { label: "Industries", href: root + "industries.html", key: "industries" },
    { label: "Resources", href: root + "resources.html", key: "resources" },
    { label: "About Us", href: root + "about.html", key: "about" },
    { label: "Careers", href: root + "careers.html", key: "careers" },
    { label: "Contact", href: root + "contact.html", key: "contact" }
  ];

  function brandMark() {
    return (
      '<a class="brand" href="' + root + 'index.html" aria-label="R&R home">' +
      "R&R</a>"
    );
  }

  function buildHeader() {
    var el = document.getElementById("site-header");
    if (!el) return;

    var navHtml = NAV.map(function (item) {
      var active = item.key === page ? ' aria-current="page"' : "";
      if (item.children) {
        return (
          '<div class="nav-item">' +
          '<a class="nav-link" href="' + item.href + '"' + active + ">" + item.label +
          '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          "</a>" +
          '<div class="nav-dropdown">' +
          item.children.map(function (c) {
            return '<a href="' + c.href + '">' + c.label + "<small>" + c.desc + "</small></a>";
          }).join("") +
          "</div></div>"
        );
      }
      return '<div class="nav-item"><a class="nav-link" href="' + item.href + '"' + active + ">" + item.label + "</a></div>";
    }).join("");

    var mobileHtml = NAV.map(function (item) {
      if (item.children) {
        return (
          "<details>" +
          "<summary>" + item.label +
          '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="16" height="16"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
          "</summary>" +
          '<div class="mnav-sub">' +
          '<a href="' + item.href + '">All Services</a>' +
          item.children.map(function (c) { return '<a href="' + c.href + '">' + c.label + "</a>"; }).join("") +
          "</div></details>"
        );
      }
      return '<a class="mnav-link" href="' + item.href + '">' + item.label + "</a>";
    }).join("");

    el.innerHTML =
      '<div class="header-inner container">' +
      brandMark() +
      '<nav class="primary-nav" aria-label="Primary">' + navHtml + "</nav>" +
      '<div class="header-actions">' +
      '<a class="btn btn-primary" href="' + root + 'contact.html">Get a Consultation</a>' +
      '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu">' +
      '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>' +
      "</button></div></div>" +
      '<div class="mobile-nav" id="mobile-nav">' + mobileHtml +
      '<a class="btn btn-primary btn-block mnav-cta" href="' + root + 'contact.html">Get a Consultation</a></div>';

    var toggle = el.querySelector(".nav-toggle");
    var mnav = el.querySelector(".mobile-nav");
    toggle.addEventListener("click", function () {
      var open = mnav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
  }

  function buildFooter() {
    var el = document.getElementById("site-footer");
    if (!el) return;
    var y = new Date().getFullYear();
    el.innerHTML =
      '<div class="container">' +
      '<div class="footer-top">' +
      '<div class="footer-brand">' + brandMark() +
      "<p>A technology partner for businesses that need cloud, security, and IT infrastructure to simply work &mdash; and to be accountable when it doesn&rsquo;t.</p>" +
      "</div>" +
      '<div class="footer-col"><h5>Company</h5><ul>' +
      '<li><a href="' + root + 'about.html">About Us</a></li>' +
      '<li><a href="' + root + 'careers.html">Careers</a></li>' +
      '<li><a href="' + root + 'contact.html">Contact</a></li>' +
      '<li><a href="' + root + 'about.html#why-choose-us">Why Choose Us</a></li>' +
      "</ul></div>" +
      '<div class="footer-col"><h5>Services</h5><ul>' +
      '<li><a href="' + root + 'services/cloud-solutions.html">Cloud Solutions</a></li>' +
      '<li><a href="' + root + 'services/cybersecurity.html">Cybersecurity</a></li>' +
      '<li><a href="' + root + 'services/managed-it.html">Managed IT</a></li>' +
      '<li><a href="' + root + 'services/it-infrastructure.html">IT Infrastructure</a></li>' +
      '<li><a href="' + root + 'services/digital-solutions.html">Digital Solutions</a></li>' +
      "</ul></div>" +
      '<div class="footer-col"><h5>Industries</h5><ul>' +
      '<li><a href="' + root + 'industries.html#healthcare">Healthcare</a></li>' +
      '<li><a href="' + root + 'industries.html#financial-services">Financial Services</a></li>' +
      '<li><a href="' + root + 'industries.html#retail">Retail</a></li>' +
      '<li><a href="' + root + 'industries.html#manufacturing">Manufacturing</a></li>' +
      '<li><a href="' + root + 'industries.html#small-business">Small Business</a></li>' +
      "</ul></div>" +
      '<div class="footer-col"><h5>Resources</h5><ul>' +
      '<li><a href="' + root + 'resources.html#resources">Free Assessments</a></li>' +
      '<li><a href="' + root + 'resources.html#faqs">FAQs</a></li>' +
      "</ul></div>" +
      "</div>" +
      '<div class="footer-bottom">' +
      "<span>&copy; " + y + " R&R. All rights reserved.</span>" +
      '<div class="legal-links">' +
      '<a href="' + root + 'legal/privacy.html">Privacy Policy</a>' +
      '<a href="' + root + 'legal/terms.html">Terms of Service</a>' +
      '<a href="' + root + 'legal/cookies.html">Cookie Policy</a>' +
      '<a href="' + root + 'legal/accessibility.html">Accessibility</a>' +
      "</div></div></div>";
  }

  // Signature network-topology SVG, used in the hero and as section watermarks.
  function netDiagramSVG(opts) {
    opts = opts || {};
    var nodes = opts.nodes || [
      { x: 60, y: 70, label: "CLOUD" },
      { x: 230, y: 40, label: "NETWORK" },
      { x: 360, y: 140, label: "SECURITY" },
      { x: 190, y: 210, label: "SERVERS" },
      { x: 40, y: 220, label: "SYSTEMS" }
    ];
    var edges = opts.edges || [[0,1],[1,2],[1,3],[3,4],[0,3],[2,3]];
    var showLabels = opts.showLabels !== false;
    var cls = opts.watermark ? "net-diagram" : "net-diagram";

    var lines = edges.map(function (e, i) {
      var a = nodes[e[0]], b = nodes[e[1]];
      var pulseDelay = (i * 0.9).toFixed(2) + "s";
      return (
        '<path class="net-line" d="M' + a.x + " " + a.y + " L" + b.x + " " + b.y + '"/>' +
        '<path class="net-pulse" style="animation-delay:' + pulseDelay + '" d="M' + a.x + " " + a.y + " L" + b.x + " " + b.y + '"/>'
      );
    }).join("");

    var pts = nodes.map(function (n, i) {
      var label = showLabels ? '<text x="' + n.x + '" y="' + (n.y + (n.y > 120 ? 26 : -18)) + '" text-anchor="middle">' + n.label + "</text>" : "";
      return (
        '<circle class="net-node-ring" cx="' + n.x + '" cy="' + n.y + '" r="16"/>' +
        '<circle class="net-node' + (i % 2 === 0 ? " active" : "") + '" cx="' + n.x + '" cy="' + n.y + '" r="7"/>' +
        label
      );
    }).join("");

    return (
      '<svg class="' + cls + '" viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram of connected cloud, network, security, server, and business systems">' +
      lines + pts + "</svg>"
    );
  }

  function mountNetDiagrams() {
    document.querySelectorAll("[data-net-diagram]").forEach(function (el) {
      var showLabels = el.getAttribute("data-labels") !== "false";
      el.innerHTML = netDiagramSVG({ showLabels: showLabels });
    });
  }

  function setupReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || items.length === 0) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach(function (el) { io.observe(el); });
  }

  function setupHeroSpotlight() {
    var hero = document.querySelector(".hero");
    if (!hero) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    hero.addEventListener("pointermove", function (e) {
      var rect = hero.getBoundingClientRect();
      var x = ((e.clientX - rect.left) / rect.width) * 100;
      var y = ((e.clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty("--mx", x + "%");
      hero.style.setProperty("--my", y + "%");
    });
  }

  // Cursor-reactive glow in the hero — a soft radial highlight that tracks the pointer.
  document.addEventListener("DOMContentLoaded", function () {
    buildHeader();
    buildFooter();
    mountNetDiagrams();
    setupReveal();
    setupHeroSpotlight();
  });
})();
