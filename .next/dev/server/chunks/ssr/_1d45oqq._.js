module.exports = [
"[project]/.next-internal/server/app/branches/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/actions/branches.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00a8cb36303f5563d7ab07ab01fc1632ecb72a36cb",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$branches$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getBranches"],
    "40745806869ed87a1be9d6354cdbfb8e37befe788e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$branches$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deactivateBranch"],
    "40803e9258c762034d6ef4544447411929336e7550",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$branches$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createBranch"],
    "40c74c524086d83da6475eeea22358186d63a1acc6",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$branches$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getBranch"],
    "60bfd3d6d96f298de952a5a4a7d550e69357dd21fd",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$branches$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateBranch"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$branches$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$actions$2f$branches$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/branches/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/actions/branches.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$branches$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/actions/branches.ts [app-rsc] (ecmascript)");
}),
"[project]/.next-internal/server/app/branches/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/actions/branches.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$actions$2f$branches$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/actions/branches.ts [app-rsc] (ecmascript)");
;
;
;
;
;
}),
"[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This function ensures that all the exported values are valid server actions,
// during the runtime. By definition all actions are required to be async
// functions, but here we can only check that they are functions.
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ensureServerEntryExports", {
    enumerable: true,
    get: function() {
        return ensureServerEntryExports;
    }
});
function ensureServerEntryExports(actions) {
    for(let i = 0; i < actions.length; i++){
        const action = actions[i];
        if (typeof action !== 'function') {
            throw Object.defineProperty(new Error(`A "use server" file can only export async functions, found ${typeof action}.\nRead more: https://nextjs.org/docs/messages/invalid-use-server-value`), "__NEXT_ERROR_CODE", {
                value: "E352",
                enumerable: false,
                configurable: true
            });
        }
    }
}
}),
"[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable import/no-extraneous-dependencies */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerServerReference", {
    enumerable: true,
    get: function() {
        return _server.registerServerReference;
    }
});
const _server = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
}),
"[project]/src/app/actions/branches.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00a8cb36303f5563d7ab07ab01fc1632ecb72a36cb":{"name":"getBranches"},"40745806869ed87a1be9d6354cdbfb8e37befe788e":{"name":"deactivateBranch"},"40803e9258c762034d6ef4544447411929336e7550":{"name":"createBranch"},"40c74c524086d83da6475eeea22358186d63a1acc6":{"name":"getBranch"},"60bfd3d6d96f298de952a5a4a7d550e69357dd21fd":{"name":"updateBranch"}},"src/app/actions/branches.ts",""] */ __turbopack_context__.s([
    "createBranch",
    ()=>createBranch,
    "deactivateBranch",
    ()=>deactivateBranch,
    "getBranch",
    ()=>getBranch,
    "getBranches",
    ()=>getBranches,
    "updateBranch",
    ()=>updateBranch
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/index.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
// Mock branch data for development
let mockBranches = [
    {
        id: "1",
        name: "Main Branch",
        code: "MAIN",
        address: "123 Main Street, Lagos",
        phone: "+234 123 456 7890",
        email: "main@abutwins.com",
        isActive: true,
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-01")
    },
    {
        id: "2",
        name: "Ikeja Branch",
        code: "IKEJA",
        address: "45 Ikeja Mall Road, Lagos",
        phone: "+234 234 567 8901",
        email: "ikeja@abutwins.com",
        isActive: true,
        createdAt: new Date("2024-02-01"),
        updatedAt: new Date("2024-02-01")
    }
];
async function getBranches() {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getServerSession"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["authOptions"]);
    if (!session) {
        return {
            success: false,
            error: "Unauthorized"
        };
    }
    const currentUser = session.user;
    // Only Super Admin and CEO can see all branches
    // Branch managers can only see their own branch
    if (currentUser.role !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].SUPER_ADMIN && currentUser.role !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].CEO) {
        if (currentUser.branchId) {
            const branch = mockBranches.find((b)=>b.id === currentUser.branchId);
            return {
                success: true,
                branches: branch ? [
                    branch
                ] : []
            };
        }
        return {
            success: true,
            branches: []
        };
    }
    return {
        success: true,
        branches: mockBranches
    };
}
async function getBranch(id) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getServerSession"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["authOptions"]);
    if (!session) {
        return {
            success: false,
            error: "Unauthorized"
        };
    }
    const currentUser = session.user;
    // Check permissions
    if (currentUser.role !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].SUPER_ADMIN && currentUser.role !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].CEO) {
        if (currentUser.branchId !== id) {
            return {
                success: false,
                error: "Access denied"
            };
        }
    }
    const branch = mockBranches.find((b)=>b.id === id);
    if (!branch) {
        return {
            success: false,
            error: "Branch not found"
        };
    }
    return {
        success: true,
        branch
    };
}
async function createBranch(data) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getServerSession"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["authOptions"]);
    if (!session) {
        return {
            success: false,
            error: "Unauthorized"
        };
    }
    const currentUser = session.user;
    // Only Super Admin and CEO can create branches
    if (currentUser.role !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].SUPER_ADMIN && currentUser.role !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].CEO) {
        return {
            success: false,
            error: "Insufficient permissions"
        };
    }
    // Check if code already exists
    if (mockBranches.some((b)=>b.code === data.code)) {
        return {
            success: false,
            error: "Branch code already exists"
        };
    }
    const newBranch = {
        id: Date.now().toString(),
        ...data,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    mockBranches.push(newBranch);
    return {
        success: true,
        branch: newBranch
    };
}
async function updateBranch(id, data) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getServerSession"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["authOptions"]);
    if (!session) {
        return {
            success: false,
            error: "Unauthorized"
        };
    }
    const currentUser = session.user;
    // Only Super Admin and CEO can update branches
    if (currentUser.role !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].SUPER_ADMIN && currentUser.role !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].CEO) {
        return {
            success: false,
            error: "Insufficient permissions"
        };
    }
    const branchIndex = mockBranches.findIndex((b)=>b.id === id);
    if (branchIndex === -1) {
        return {
            success: false,
            error: "Branch not found"
        };
    }
    mockBranches[branchIndex] = {
        ...mockBranches[branchIndex],
        ...data,
        updatedAt: new Date()
    };
    return {
        success: true,
        branch: mockBranches[branchIndex]
    };
}
async function deactivateBranch(id) {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getServerSession"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["authOptions"]);
    if (!session) {
        return {
            success: false,
            error: "Unauthorized"
        };
    }
    const currentUser = session.user;
    // Only Super Admin can deactivate branches
    if (currentUser.role !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["UserRole"].SUPER_ADMIN) {
        return {
            success: false,
            error: "Insufficient permissions"
        };
    }
    const branchIndex = mockBranches.findIndex((b)=>b.id === id);
    if (branchIndex === -1) {
        return {
            success: false,
            error: "Branch not found"
        };
    }
    mockBranches[branchIndex].isActive = false;
    mockBranches[branchIndex].updatedAt = new Date();
    return {
        success: true,
        branch: mockBranches[branchIndex]
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getBranches,
    getBranch,
    createBranch,
    updateBranch,
    deactivateBranch
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getBranches, "00a8cb36303f5563d7ab07ab01fc1632ecb72a36cb", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getBranch, "40c74c524086d83da6475eeea22358186d63a1acc6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createBranch, "40803e9258c762034d6ef4544447411929336e7550", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateBranch, "60bfd3d6d96f298de952a5a4a7d550e69357dd21fd", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deactivateBranch, "40745806869ed87a1be9d6354cdbfb8e37befe788e", null);
}),
];

//# sourceMappingURL=_1d45oqq._.js.map