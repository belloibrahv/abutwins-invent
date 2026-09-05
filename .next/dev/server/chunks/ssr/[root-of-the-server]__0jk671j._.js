module.exports = [
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/querystring [external] (querystring, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[project]/src/app/dashboard/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth-utils.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$navbar$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/auth/navbar.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$sidebar$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/sidebar.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
async function DashboardLayout({ children }) {
    const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2d$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCurrentUser"])();
    if (!user) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/login");
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$navbar$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/app/dashboard/layout.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$sidebar$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/app/dashboard/layout.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "flex-1 ml-64 mt-16 p-6",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/layout.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/layout.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/layout.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/dashboard/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/dashboard/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/components/auth/navbar.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/auth/navbar.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/auth/navbar.tsx", "default");
}),
"[project]/src/components/auth/navbar.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/auth/navbar.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/auth/navbar.tsx <module evaluation>", "default");
}),
"[project]/src/components/auth/navbar.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$navbar$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/auth/navbar.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$navbar$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/auth/navbar.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$navbar$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/components/layout/sidebar.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/layout/sidebar.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/layout/sidebar.tsx", "default");
}),
"[project]/src/components/layout/sidebar.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/components/layout/sidebar.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/layout/sidebar.tsx <module evaluation>", "default");
}),
"[project]/src/components/layout/sidebar.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$sidebar$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/layout/sidebar.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$sidebar$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/layout/sidebar.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$sidebar$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/lib/auth-utils.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "canAccessBranch",
    ()=>canAccessBranch,
    "getCurrentUser",
    ()=>getCurrentUser,
    "getSession",
    ()=>getSession,
    "hasPermission",
    ()=>hasPermission,
    "requireAccountant",
    ()=>requireAccountant,
    "requireAuditor",
    ()=>requireAuditor,
    "requireAuth",
    ()=>requireAuth,
    "requireBranchManager",
    ()=>requireBranchManager,
    "requireCEO",
    ()=>requireCEO,
    "requireCashier",
    ()=>requireCashier,
    "requireEngineer",
    ()=>requireEngineer,
    "requireRole",
    ()=>requireRole,
    "requireSuperAdmin",
    ()=>requireSuperAdmin,
    "requireVaultManager",
    ()=>requireVaultManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/index.ts [app-rsc] (ecmascript)");
;
;
;
;
async function getSession() {
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getServerSession"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["authOptions"]);
}
async function getCurrentUser() {
    const session = await getSession();
    return session?.user;
}
async function requireAuth() {
    const session = await getSession();
    if (!session) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/login");
    }
    return session;
}
async function requireRole(allowedRoles) {
    const session = await requireAuth();
    const userRole = session.user.role;
    if (!allowedRoles.includes(userRole)) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])("/unauthorized");
    }
    return session;
}
async function requireSuperAdmin() {
    return requireRole([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].SUPER_ADMIN
    ]);
}
async function requireCEO() {
    return requireRole([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].SUPER_ADMIN,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].CEO
    ]);
}
async function requireAuditor() {
    return requireRole([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].SUPER_ADMIN,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].CEO,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].AUDITOR
    ]);
}
async function requireAccountant() {
    return requireRole([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].SUPER_ADMIN,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].CEO,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].ACCOUNTANT
    ]);
}
async function requireBranchManager() {
    return requireRole([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].SUPER_ADMIN,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].CEO,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].BRANCH_MANAGER
    ]);
}
async function requireVaultManager() {
    return requireRole([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].SUPER_ADMIN,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].CEO,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].BRANCH_MANAGER,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].VAULT_MANAGER
    ]);
}
async function requireCashier() {
    return requireRole([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].SUPER_ADMIN,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].CEO,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].BRANCH_MANAGER,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].CASHIER,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].SALES_EXECUTIVE
    ]);
}
async function requireEngineer() {
    return requireRole([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].SUPER_ADMIN,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].CEO,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].BRANCH_MANAGER,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].ENGINEER
    ]);
}
function hasPermission(userRole, requiredRole) {
    const roleHierarchy = {
        [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].SUPER_ADMIN]: 9,
        [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].CEO]: 8,
        [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].AUDITOR]: 7,
        [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].ACCOUNTANT]: 6,
        [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].BRANCH_MANAGER]: 5,
        [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].VAULT_MANAGER]: 4,
        [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].CASHIER]: 3,
        [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].SALES_EXECUTIVE]: 2,
        [__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].ENGINEER]: 1
    };
    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}
function canAccessBranch(userRole, userBranchId, targetBranchId) {
    // Super admins and CEOs can access all branches
    if (userRole === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].SUPER_ADMIN || userRole === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].CEO) {
        return true;
    }
    // Other roles can only access their own branch
    return userBranchId === targetBranchId;
}
}),
"[project]/src/lib/auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authOptions",
    ()=>authOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/providers/credentials.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/index.ts [app-rsc] (ecmascript)");
;
;
;
// Mock user data for development (will be replaced with database)
const mockUsers = [
    {
        id: "1",
        email: "admin@abutwins.com",
        password: "$2b$10$bpNZ3Ms8pECrVgpWccGGsuh5Gn/xEhXUVCk.bScu0ft4gmMXDBIg6",
        name: "Super Admin",
        role: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].SUPER_ADMIN,
        branchId: null
    },
    {
        id: "2",
        email: "ceo@abutwins.com",
        password: "$2b$10$dfo.c69plhSLN7BZpIAnRe/xBm71sJv1/AX7QUglwOcKZ04lFg5TS",
        name: "CEO",
        role: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].CEO,
        branchId: null
    }
];
const authOptions = {
    providers: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])({
            name: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize (credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }
                // For development, use mock users
                const user = mockUsers.find((u)=>u.email === credentials.email);
                if (!user) {
                    throw new Error("Invalid credentials");
                }
                // Simple password check for development
                const isPasswordValid = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["compare"](credentials.password, user.password);
                if (!isPasswordValid) {
                    throw new Error("Invalid credentials");
                }
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    branchId: user.branchId
                };
            }
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    pages: {
        signIn: "/login"
    },
    callbacks: {
        async jwt ({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.branchId = user.branchId;
            }
            return token;
        },
        async session ({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.branchId = token.branchId;
            }
            return session;
        }
    },
    secret: "your-secret-key-change-this-in-production-min-32-characters-long"
};
}),
"[project]/src/types/index.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Abu Twins Enterprise ERP - TypeScript Type Definitions
// This file contains type definitions that complement the Prisma schema
// Local UserRole enum for development (will be replaced with Prisma enum)
__turbopack_context__.s([
    "ApprovalStatus",
    ()=>ApprovalStatus,
    "ApprovalType",
    ()=>ApprovalType,
    "AuditAction",
    ()=>AuditAction,
    "ExpenseCategory",
    ()=>ExpenseCategory,
    "IMEIStatus",
    ()=>IMEIStatus,
    "LedgerEntryType",
    ()=>LedgerEntryType,
    "NotificationStatus",
    ()=>NotificationStatus,
    "NotificationType",
    ()=>NotificationType,
    "PaymentMethod",
    ()=>PaymentMethod,
    "ProductCondition",
    ()=>ProductCondition,
    "PurchaseStatus",
    ()=>PurchaseStatus,
    "ReconciliationStatus",
    ()=>ReconciliationStatus,
    "RepairStatus",
    ()=>RepairStatus,
    "ReturnOutcome",
    ()=>ReturnOutcome,
    "ReturnReason",
    ()=>ReturnReason,
    "ReturnStatus",
    ()=>ReturnStatus,
    "SaleStatus",
    ()=>SaleStatus,
    "SwapStatus",
    ()=>SwapStatus,
    "TransferStatus",
    ()=>TransferStatus,
    "UserRole",
    ()=>UserRole
]);
var UserRole = /*#__PURE__*/ function(UserRole) {
    UserRole["SUPER_ADMIN"] = "SUPER_ADMIN";
    UserRole["CEO"] = "CEO";
    UserRole["AUDITOR"] = "AUDITOR";
    UserRole["ACCOUNTANT"] = "ACCOUNTANT";
    UserRole["BRANCH_MANAGER"] = "BRANCH_MANAGER";
    UserRole["VAULT_MANAGER"] = "VAULT_MANAGER";
    UserRole["CASHIER"] = "CASHIER";
    UserRole["SALES_EXECUTIVE"] = "SALES_EXECUTIVE";
    UserRole["ENGINEER"] = "ENGINEER";
    return UserRole;
}({});
var ProductCondition = /*#__PURE__*/ function(ProductCondition) {
    ProductCondition["BRAND_NEW"] = "BRAND_NEW";
    ProductCondition["OPEN_BOX"] = "OPEN_BOX";
    ProductCondition["UK_USED"] = "UK_USED";
    ProductCondition["REFURBISHED"] = "REFURBISHED";
    ProductCondition["SWAP_DEVICE"] = "SWAP_DEVICE";
    ProductCondition["FAULTY"] = "FAULTY";
    ProductCondition["REPAIR_DEVICE"] = "REPAIR_DEVICE";
    return ProductCondition;
}({});
var IMEIStatus = /*#__PURE__*/ function(IMEIStatus) {
    IMEIStatus["IN_STOCK"] = "IN_STOCK";
    IMEIStatus["TRANSFERRED"] = "TRANSFERRED";
    IMEIStatus["SOLD"] = "SOLD";
    IMEIStatus["RETURNED"] = "RETURNED";
    IMEIStatus["REPAIRED"] = "REPAIRED";
    IMEIStatus["SWAPPED"] = "SWAPPED";
    IMEIStatus["DISPOSED"] = "DISPOSED";
    IMEIStatus["FAULTY"] = "FAULTY";
    return IMEIStatus;
}({});
var PurchaseStatus = /*#__PURE__*/ function(PurchaseStatus) {
    PurchaseStatus["PENDING"] = "PENDING";
    PurchaseStatus["ORDERED"] = "ORDERED";
    PurchaseStatus["PARTIAL_RECEIVED"] = "PARTIAL_RECEIVED";
    PurchaseStatus["RECEIVED"] = "RECEIVED";
    PurchaseStatus["CANCELLED"] = "CANCELLED";
    return PurchaseStatus;
}({});
var PaymentMethod = /*#__PURE__*/ function(PaymentMethod) {
    PaymentMethod["CASH"] = "CASH";
    PaymentMethod["TRANSFER"] = "TRANSFER";
    PaymentMethod["POS"] = "POS";
    PaymentMethod["CREDIT"] = "CREDIT";
    PaymentMethod["SPLIT_PAYMENT"] = "SPLIT_PAYMENT";
    return PaymentMethod;
}({});
var SaleStatus = /*#__PURE__*/ function(SaleStatus) {
    SaleStatus["PENDING"] = "PENDING";
    SaleStatus["COMPLETED"] = "COMPLETED";
    SaleStatus["CANCELLED"] = "CANCELLED";
    SaleStatus["REFUNDED"] = "REFUNDED";
    return SaleStatus;
}({});
var ReturnReason = /*#__PURE__*/ function(ReturnReason) {
    ReturnReason["FAULTY"] = "FAULTY";
    ReturnReason["WARRANTY"] = "WARRANTY";
    ReturnReason["CUSTOMER_DISSATISFACTION"] = "CUSTOMER_DISSATISFACTION";
    ReturnReason["DAMAGED"] = "DAMAGED";
    ReturnReason["SUPPLIER_RETURN"] = "SUPPLIER_RETURN";
    ReturnReason["WRONG_PRODUCT"] = "WRONG_PRODUCT";
    return ReturnReason;
}({});
var ReturnOutcome = /*#__PURE__*/ function(ReturnOutcome) {
    ReturnOutcome["REPLACEMENT"] = "REPLACEMENT";
    ReturnOutcome["REPAIR"] = "REPAIR";
    ReturnOutcome["REFUND"] = "REFUND";
    ReturnOutcome["CREDIT_NOTE"] = "CREDIT_NOTE";
    return ReturnOutcome;
}({});
var ReturnStatus = /*#__PURE__*/ function(ReturnStatus) {
    ReturnStatus["PENDING"] = "PENDING";
    ReturnStatus["APPROVED"] = "APPROVED";
    ReturnStatus["REJECTED"] = "REJECTED";
    ReturnStatus["COMPLETED"] = "COMPLETED";
    return ReturnStatus;
}({});
var SwapStatus = /*#__PURE__*/ function(SwapStatus) {
    SwapStatus["PENDING"] = "PENDING";
    SwapStatus["APPROVED"] = "APPROVED";
    SwapStatus["REJECTED"] = "REJECTED";
    SwapStatus["COMPLETED"] = "COMPLETED";
    SwapStatus["CANCELLED"] = "CANCELLED";
    return SwapStatus;
}({});
var RepairStatus = /*#__PURE__*/ function(RepairStatus) {
    RepairStatus["PENDING"] = "PENDING";
    RepairStatus["DIAGNOSING"] = "DIAGNOSING";
    RepairStatus["REPAIRING"] = "REPAIRING";
    RepairStatus["WAITING_PARTS"] = "WAITING_PARTS";
    RepairStatus["COMPLETED"] = "COMPLETED";
    RepairStatus["DELIVERED"] = "DELIVERED";
    RepairStatus["CANCELLED"] = "CANCELLED";
    return RepairStatus;
}({});
var TransferStatus = /*#__PURE__*/ function(TransferStatus) {
    TransferStatus["PENDING"] = "PENDING";
    TransferStatus["IN_TRANSIT"] = "IN_TRANSIT";
    TransferStatus["RECEIVED"] = "RECEIVED";
    TransferStatus["CANCELLED"] = "CANCELLED";
    return TransferStatus;
}({});
var ExpenseCategory = /*#__PURE__*/ function(ExpenseCategory) {
    ExpenseCategory["TRANSPORT"] = "TRANSPORT";
    ExpenseCategory["FUEL"] = "FUEL";
    ExpenseCategory["RENT"] = "RENT";
    ExpenseCategory["UTILITIES"] = "UTILITIES";
    ExpenseCategory["REPAIRS"] = "REPAIRS";
    ExpenseCategory["SALARY"] = "SALARY";
    ExpenseCategory["MISCELLANEOUS"] = "MISCELLANEOUS";
    ExpenseCategory["MARKETING"] = "MARKETING";
    return ExpenseCategory;
}({});
var ApprovalType = /*#__PURE__*/ function(ApprovalType) {
    ApprovalType["PRICE_DISCOUNT"] = "PRICE_DISCOUNT";
    ApprovalType["REFUND"] = "REFUND";
    ApprovalType["STOCK_ADJUSTMENT"] = "STOCK_ADJUSTMENT";
    ApprovalType["RECONCILIATION"] = "RECONCILIATION";
    ApprovalType["EXPENSE"] = "EXPENSE";
    ApprovalType["TRANSFER"] = "TRANSFER";
    ApprovalType["SWAP"] = "SWAP";
    ApprovalType["RETURN"] = "RETURN";
    return ApprovalType;
}({});
var ApprovalStatus = /*#__PURE__*/ function(ApprovalStatus) {
    ApprovalStatus["PENDING"] = "PENDING";
    ApprovalStatus["APPROVED"] = "APPROVED";
    ApprovalStatus["REJECTED"] = "REJECTED";
    return ApprovalStatus;
}({});
var ReconciliationStatus = /*#__PURE__*/ function(ReconciliationStatus) {
    ReconciliationStatus["IN_PROGRESS"] = "IN_PROGRESS";
    ReconciliationStatus["PENDING_APPROVAL"] = "PENDING_APPROVAL";
    ReconciliationStatus["APPROVED"] = "APPROVED";
    ReconciliationStatus["REJECTED"] = "REJECTED";
    return ReconciliationStatus;
}({});
var AuditAction = /*#__PURE__*/ function(AuditAction) {
    AuditAction["CREATE"] = "CREATE";
    AuditAction["UPDATE"] = "UPDATE";
    AuditAction["DELETE"] = "DELETE";
    AuditAction["LOGIN"] = "LOGIN";
    AuditAction["LOGOUT"] = "LOGOUT";
    AuditAction["APPROVE"] = "APPROVE";
    AuditAction["REJECT"] = "REJECT";
    AuditAction["EXPORT"] = "EXPORT";
    AuditAction["IMPORT"] = "IMPORT";
    return AuditAction;
}({});
var NotificationType = /*#__PURE__*/ function(NotificationType) {
    NotificationType["LOW_STOCK"] = "LOW_STOCK";
    NotificationType["PRICE_UPDATE"] = "PRICE_UPDATE";
    NotificationType["APPROVAL_REQUEST"] = "APPROVAL_REQUEST";
    NotificationType["DUE_PAYMENT"] = "DUE_PAYMENT";
    NotificationType["TRANSFER"] = "TRANSFER";
    NotificationType["RETURN"] = "RETURN";
    NotificationType["SYSTEM"] = "SYSTEM";
    return NotificationType;
}({});
var NotificationStatus = /*#__PURE__*/ function(NotificationStatus) {
    NotificationStatus["UNREAD"] = "UNREAD";
    NotificationStatus["READ"] = "READ";
    NotificationStatus["ARCHIVED"] = "ARCHIVED";
    return NotificationStatus;
}({});
var LedgerEntryType = /*#__PURE__*/ function(LedgerEntryType) {
    LedgerEntryType["SALE"] = "SALE";
    LedgerEntryType["PAYMENT"] = "PAYMENT";
    LedgerEntryType["REFUND"] = "REFUND";
    LedgerEntryType["ADJUSTMENT"] = "ADJUSTMENT";
    LedgerEntryType["DISCOUNT"] = "DISCOUNT";
    return LedgerEntryType;
}({});
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0jk671j._.js.map