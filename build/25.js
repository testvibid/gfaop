webpackJsonp([25],{

/***/ 1817:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./node_modules/@angular/core/esm5/core.js
var core = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/ionic-angular/index.js + 3 modules
var ionic_angular = __webpack_require__(9);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/index.js + 1 modules
var _ngx_translate_core = __webpack_require__(5);

// EXTERNAL MODULE: ./src/components/components.module.ts
var components_module = __webpack_require__(32);

// EXTERNAL MODULE: ./src/directives/directives.module.ts + 1 modules
var directives_module = __webpack_require__(30);

// EXTERNAL MODULE: ./node_modules/@angular/forms/esm5/forms.js
var esm5_forms = __webpack_require__(17);

// EXTERNAL MODULE: ./src/providers/events.ts
var events = __webpack_require__(20);

// EXTERNAL MODULE: ./src/providers/sites.ts
var sites = __webpack_require__(1);

// EXTERNAL MODULE: ./src/providers/utils/dom.ts
var dom = __webpack_require__(3);

// EXTERNAL MODULE: ./src/providers/utils/text.ts
var utils_text = __webpack_require__(11);

// EXTERNAL MODULE: ./src/core/fileuploader/providers/fileuploader.ts
var fileuploader = __webpack_require__(73);

// EXTERNAL MODULE: ./src/addon/mod/glossary/providers/glossary.ts
var glossary = __webpack_require__(180);

// EXTERNAL MODULE: ./src/addon/mod/glossary/providers/offline.ts
var offline = __webpack_require__(220);

// EXTERNAL MODULE: ./src/addon/mod/glossary/providers/helper.ts
var helper = __webpack_require__(446);

// CONCATENATED MODULE: ./src/addon/mod/glossary/pages/edit/edit.ts
// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












/**
 * Page that displays the edit form.
 */
var edit_AddonModGlossaryEditPage = /** @class */ (function () {
    function AddonModGlossaryEditPage(navParams, navCtrl, translate, domUtils, eventsProvider, sitesProvider, uploaderProvider, textUtils, glossaryProvider, glossaryOffline, glossaryHelper) {
        this.navParams = navParams;
        this.navCtrl = navCtrl;
        this.translate = translate;
        this.domUtils = domUtils;
        this.eventsProvider = eventsProvider;
        this.sitesProvider = sitesProvider;
        this.uploaderProvider = uploaderProvider;
        this.textUtils = textUtils;
        this.glossaryProvider = glossaryProvider;
        this.glossaryOffline = glossaryOffline;
        this.glossaryHelper = glossaryHelper;
        this.component = glossary["a" /* AddonModGlossaryProvider */].COMPONENT;
        this.loaded = false;
        this.entry = {
            concept: '',
            definition: '',
            timecreated: 0,
        };
        this.options = {
            categories: [],
            aliases: '',
            usedynalink: false,
            casesensitive: false,
            fullmatch: false
        };
        this.attachments = [];
        this.definitionControl = new esm5_forms["e" /* FormControl */]();
        this.categories = [];
        this.isDestroyed = false;
        this.saved = false;
        this.courseId = navParams.get('courseId');
        this.module = navParams.get('module');
        this.glossary = navParams.get('glossary');
    }
    /**
     * Component being initialized.
     */
    AddonModGlossaryEditPage.prototype.ngOnInit = function () {
        var _this = this;
        var entry = this.navParams.get('entry');
        var promise;
        if (entry) {
            this.entry.concept = entry.concept || '';
            this.entry.definition = entry.definition || '';
            this.originalData = {
                concept: this.entry.concept,
                definition: this.entry.definition,
                files: [],
            };
            if (entry.options) {
                this.options.categories = entry.options.categories || [];
                this.options.aliases = entry.options.aliases || '';
                this.options.usedynalink = !!entry.options.usedynalink;
                if (this.options.usedynalink) {
                    this.options.casesensitive = !!entry.options.casesensitive;
                    this.options.fullmatch = !!entry.options.fullmatch;
                }
            }
            // Treat offline attachments if any.
            if (entry.attachments && entry.attachments.offline) {
                promise = this.glossaryHelper.getStoredFiles(this.glossary.id, entry.concept, entry.timecreated).then(function (files) {
                    _this.attachments = files;
                    _this.originalData.files = files.slice();
                });
            }
        }
        this.definitionControl.setValue(this.entry.definition);
        Promise.resolve(promise).then(function () {
            _this.glossaryProvider.getAllCategories(_this.glossary.id).then(function (categories) {
                _this.categories = categories;
            }).finally(function () {
                _this.loaded = true;
            });
        });
    };
    /**
     * Definition changed.
     *
     * @param {string} text The new text.
     */
    AddonModGlossaryEditPage.prototype.onDefinitionChange = function (text) {
        this.entry.definition = text;
    };
    /**
     * Check if we can leave the page or not.
     *
     * @return {boolean|Promise<void>} Resolved if we can leave it, rejected if not.
     */
    AddonModGlossaryEditPage.prototype.ionViewCanLeave = function () {
        var _this = this;
        var promise;
        if (!this.saved && this.glossaryHelper.hasEntryDataChanged(this.entry, this.attachments, this.originalData)) {
            // Show confirmation if some data has been modified.
            promise = this.domUtils.showConfirm(this.translate.instant('core.confirmcanceledit'));
        }
        else {
            promise = Promise.resolve();
        }
        return promise.then(function () {
            // Delete the local files from the tmp folder.
            _this.uploaderProvider.clearTmpFiles(_this.attachments);
        });
    };
    /**
     * Save the entry.
     */
    AddonModGlossaryEditPage.prototype.save = function () {
        var _this = this;
        var definition = this.entry.definition, saveOffline = false, promise;
        var timecreated = this.entry.timecreated || Date.now();
        if (!this.entry.concept || !definition) {
            this.domUtils.showErrorModal('addon.mod_glossary.fillfields', true);
            return;
        }
        var modal = this.domUtils.showModalLoading('core.sending', true);
        // Add some HTML to the definition if needed.
        definition = this.textUtils.formatHtmlLines(definition);
        // Upload attachments first if any.
        if (this.attachments.length > 0) {
            promise = this.glossaryHelper.uploadOrStoreFiles(this.glossary.id, this.entry.concept, timecreated, this.attachments, false).catch(function () {
                // Cannot upload them in online, save them in offline.
                saveOffline = true;
                return _this.glossaryHelper.uploadOrStoreFiles(_this.glossary.id, _this.entry.concept, timecreated, _this.attachments, true);
            });
        }
        else {
            promise = Promise.resolve();
        }
        promise.then(function (attach) {
            var options = {
                aliases: _this.options.aliases,
                categories: _this.options.categories.join(',')
            };
            if (_this.glossary.usedynalink) {
                options.usedynalink = _this.options.usedynalink ? 1 : 0;
                if (_this.options.usedynalink) {
                    options.casesensitive = _this.options.casesensitive ? 1 : 0;
                    options.fullmatch = _this.options.fullmatch ? 1 : 0;
                }
            }
            if (saveOffline) {
                var promise_1;
                if (_this.entry && !_this.glossary.allowduplicatedentries) {
                    // Check if the entry is duplicated in online or offline mode.
                    promise_1 = _this.glossaryProvider.isConceptUsed(_this.glossary.id, _this.entry.concept, _this.entry.timecreated)
                        .then(function (used) {
                        if (used) {
                            // There's a entry with same name, reject with error message.
                            return Promise.reject(_this.translate.instant('addon.mod_glossary.errconceptalreadyexists'));
                        }
                    });
                }
                else {
                    promise_1 = Promise.resolve();
                }
                return promise_1.then(function () {
                    // Save entry in offline.
                    return _this.glossaryOffline.addNewEntry(_this.glossary.id, _this.entry.concept, definition, _this.courseId, options, attach, timecreated, undefined, undefined, _this.entry).then(function () {
                        // Don't return anything.
                    });
                });
            }
            else {
                // Try to send it to server.
                // Don't allow offline if there are attachments since they were uploaded fine.
                return _this.glossaryProvider.addEntry(_this.glossary.id, _this.entry.concept, definition, _this.courseId, options, attach, timecreated, undefined, _this.entry, !_this.attachments.length, !_this.glossary.allowduplicatedentries);
            }
        }).then(function (entryId) {
            if (entryId) {
                // Data sent to server, delete stored files (if any).
                _this.glossaryHelper.deleteStoredFiles(_this.glossary.id, _this.entry.concept, timecreated);
            }
            var data = {
                glossaryId: _this.glossary.id,
            };
            _this.eventsProvider.trigger(glossary["a" /* AddonModGlossaryProvider */].ADD_ENTRY_EVENT, data, _this.sitesProvider.getCurrentSiteId());
            _this.saved = true;
            _this.navCtrl.pop();
        }).catch(function (error) {
            _this.domUtils.showErrorModalDefault(error, 'addon.mod_glossary.cannoteditentry', true);
        }).finally(function () {
            modal.dismiss();
        });
    };
    AddonModGlossaryEditPage = __decorate([
        Object(core["m" /* Component */])({
            selector: 'page-addon-mod-glossary-edit',
            templateUrl: 'edit.html',
        }),
        __metadata("design:paramtypes", [ionic_angular["r" /* NavParams */],
            ionic_angular["q" /* NavController */],
            _ngx_translate_core["c" /* TranslateService */],
            dom["a" /* CoreDomUtilsProvider */],
            events["a" /* CoreEventsProvider */],
            sites["a" /* CoreSitesProvider */],
            fileuploader["a" /* CoreFileUploaderProvider */],
            utils_text["a" /* CoreTextUtilsProvider */],
            glossary["a" /* AddonModGlossaryProvider */],
            offline["a" /* AddonModGlossaryOfflineProvider */],
            helper["a" /* AddonModGlossaryHelperProvider */]])
    ], AddonModGlossaryEditPage);
    return AddonModGlossaryEditPage;
}());

//# sourceMappingURL=edit.js.map
// CONCATENATED MODULE: ./src/addon/mod/glossary/pages/edit/edit.module.ts
// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
var edit_module___decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var edit_module_AddonModGlossaryNewDiscussionPageModule = /** @class */ (function () {
    function AddonModGlossaryNewDiscussionPageModule() {
    }
    AddonModGlossaryNewDiscussionPageModule = edit_module___decorate([
        Object(core["I" /* NgModule */])({
            declarations: [
                edit_AddonModGlossaryEditPage,
            ],
            imports: [
                components_module["a" /* CoreComponentsModule */],
                directives_module["a" /* CoreDirectivesModule */],
                ionic_angular["l" /* IonicPageModule */].forChild(edit_AddonModGlossaryEditPage),
                _ngx_translate_core["b" /* TranslateModule */].forChild()
            ],
        })
    ], AddonModGlossaryNewDiscussionPageModule);
    return AddonModGlossaryNewDiscussionPageModule;
}());

//# sourceMappingURL=edit.module.js.map
// EXTERNAL MODULE: ./node_modules/ionic-angular/components/action-sheet/action-sheet-component.ngfactory.js
var action_sheet_component_ngfactory = __webpack_require__(1285);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/alert/alert-component.ngfactory.js
var alert_component_ngfactory = __webpack_require__(1286);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app-root.ngfactory.js
var app_root_ngfactory = __webpack_require__(1287);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/loading/loading-component.ngfactory.js
var loading_component_ngfactory = __webpack_require__(1288);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/modal/modal-component.ngfactory.js
var modal_component_ngfactory = __webpack_require__(1289);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/picker/picker-component.ngfactory.js + 1 modules
var picker_component_ngfactory = __webpack_require__(1290);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/popover/popover-component.ngfactory.js
var popover_component_ngfactory = __webpack_require__(1291);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/select/select-popover-component.ngfactory.js
var select_popover_component_ngfactory = __webpack_require__(1292);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toast/toast-component.ngfactory.js
var toast_component_ngfactory = __webpack_require__(1293);

// EXTERNAL MODULE: ./src/components/context-menu/context-menu-popover.ngfactory.js
var context_menu_popover_ngfactory = __webpack_require__(1296);

// EXTERNAL MODULE: ./src/components/course-picker-menu/course-picker-menu-popover.ngfactory.js
var course_picker_menu_popover_ngfactory = __webpack_require__(1297);

// EXTERNAL MODULE: ./src/components/recaptcha/recaptchamodal.ngfactory.js
var recaptchamodal_ngfactory = __webpack_require__(1298);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/option/option.js
var option_option = __webpack_require__(98);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.ngfactory.js + 1 modules
var item_ngfactory = __webpack_require__(33);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item.js
var item = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/form.js
var util_form = __webpack_require__(18);

// EXTERNAL MODULE: ./node_modules/ionic-angular/config/config.js
var config = __webpack_require__(6);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-reorder.js + 1 modules
var item_reorder = __webpack_require__(28);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-content.js
var item_content = __webpack_require__(31);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/label/label.js
var label = __webpack_require__(58);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.pipe.js
var translate_pipe = __webpack_require__(27);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.service.js
var translate_service = __webpack_require__(16);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/select/select.ngfactory.js
var select_ngfactory = __webpack_require__(112);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/select/select.js
var select_select = __webpack_require__(99);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/app/app.js + 3 modules
var app = __webpack_require__(26);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/deep-linker.js
var deep_linker = __webpack_require__(47);

// EXTERNAL MODULE: ./node_modules/@angular/common/esm5/common.js
var common = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/item/item-divider.js
var item_divider = __webpack_require__(159);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toggle/toggle.ngfactory.js
var toggle_ngfactory = __webpack_require__(1895);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toggle/toggle.js + 1 modules
var toggle = __webpack_require__(639);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/platform.js + 1 modules
var platform = __webpack_require__(13);

// EXTERNAL MODULE: ./node_modules/ionic-angular/tap-click/haptic.js
var haptic = __webpack_require__(193);

// EXTERNAL MODULE: ./node_modules/ionic-angular/gestures/gesture-controller.js
var gesture_controller = __webpack_require__(35);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/dom-controller.js
var dom_controller = __webpack_require__(25);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-header.js
var toolbar_header = __webpack_require__(418);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/view-controller.js
var view_controller = __webpack_require__(34);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.ngfactory.js
var navbar_ngfactory = __webpack_require__(1294);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/navbar.js
var navbar = __webpack_require__(191);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-controller.js
var nav_controller = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.ngfactory.js
var toolbar_title_ngfactory = __webpack_require__(1295);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-title.js
var toolbar_title = __webpack_require__(326);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar.js
var toolbar = __webpack_require__(237);

// EXTERNAL MODULE: ./src/directives/format-text.ts
var format_text = __webpack_require__(37);

// EXTERNAL MODULE: ./src/providers/utils/utils.ts
var utils = __webpack_require__(2);

// EXTERNAL MODULE: ./src/providers/utils/url.ts
var url = __webpack_require__(23);

// EXTERNAL MODULE: ./src/providers/logger.ts
var logger = __webpack_require__(4);

// EXTERNAL MODULE: ./src/providers/filepool.ts
var filepool = __webpack_require__(15);

// EXTERNAL MODULE: ./src/providers/app.ts
var providers_app = __webpack_require__(10);

// EXTERNAL MODULE: ./src/core/contentlinks/providers/helper.ts
var providers_helper = __webpack_require__(22);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.js
var content = __webpack_require__(24);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/toolbar/toolbar-item.js
var toolbar_item = __webpack_require__(419);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.ngfactory.js
var button_ngfactory = __webpack_require__(44);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/button/button.js
var button_button = __webpack_require__(38);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/content/content.ngfactory.js
var content_ngfactory = __webpack_require__(176);

// EXTERNAL MODULE: ./node_modules/ionic-angular/platform/keyboard.js
var keyboard = __webpack_require__(97);

// EXTERNAL MODULE: ./src/components/loading/loading.ngfactory.js
var loading_ngfactory = __webpack_require__(54);

// EXTERNAL MODULE: ./src/components/loading/loading.ts
var loading = __webpack_require__(48);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/list/list.js + 1 modules
var list = __webpack_require__(78);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/input/input.ngfactory.js
var input_ngfactory = __webpack_require__(89);

// EXTERNAL MODULE: ./node_modules/ionic-angular/components/input/input.js
var input = __webpack_require__(72);

// EXTERNAL MODULE: ./src/components/rich-text-editor/rich-text-editor.ngfactory.js
var rich_text_editor_ngfactory = __webpack_require__(267);

// EXTERNAL MODULE: ./src/components/rich-text-editor/rich-text-editor.ts
var rich_text_editor = __webpack_require__(213);

// EXTERNAL MODULE: ./node_modules/@ionic-native/keyboard/index.js
var _ionic_native_keyboard = __webpack_require__(164);

// EXTERNAL MODULE: ./src/directives/auto-rows.ts
var auto_rows = __webpack_require__(337);

// EXTERNAL MODULE: ./src/components/attachments/attachments.ngfactory.js
var attachments_ngfactory = __webpack_require__(428);

// EXTERNAL MODULE: ./src/components/attachments/attachments.ts
var attachments = __webpack_require__(271);

// EXTERNAL MODULE: ./src/core/fileuploader/providers/helper.ts
var fileuploader_providers_helper = __webpack_require__(120);

// EXTERNAL MODULE: ./node_modules/ionic-angular/navigation/nav-params.js
var nav_params = __webpack_require__(57);

// CONCATENATED MODULE: ./src/addon/mod/glossary/pages/edit/edit.ngfactory.js
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 



































































var styles_AddonModGlossaryEditPage = [];
var RenderType_AddonModGlossaryEditPage = core["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_AddonModGlossaryEditPage, data: {} });

function View_AddonModGlossaryEditPage_2(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 2, "ion-option", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, [[11, 4]], 0, option_option["a" /* Option */], [core["t" /* ElementRef */]], { value: [0, "value"] }, null), (_l()(), core["_55" /* ɵted */](2, null, ["", ""]))], function (_ck, _v) { var currVal_0 = _v.context.$implicit.id; _ck(_v, 1, 0, currVal_0); }, function (_ck, _v) { var currVal_1 = _v.context.$implicit.name; _ck(_v, 2, 0, currVal_1); }); }
function View_AddonModGlossaryEditPage_1(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 23, "ion-item", [["class", "item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](1, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 8, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 9, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 10, { _icons: 1 }), core["_30" /* ɵdid */](5, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](7, 0, null, 1, 3, "ion-label", [["id", "addon-mod-glossary-categories-label"], ["stacked", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](8, 16384, [[8, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, ""], [8, null], [8, null]], { id: [0, "id"] }, null), (_l()(), core["_55" /* ɵted */](9, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](12, 0, null, 3, 10, "ion-select", [["aria-labelledby", "addon-mod-glossary-categories-label"], ["interface", "popover"], ["multiple", "true"]], [[2, "select-disabled", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "click"], [null, "keyup.space"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 13)._click($event) !== false);
        ad = (pd_0 && ad);
    } if (("keyup.space" === en)) {
        var pd_1 = (core["_44" /* ɵnov */](_v, 13)._keyup() !== false);
        ad = (pd_1 && ad);
    } if (("ngModelChange" === en)) {
        var pd_2 = ((_co.options.categories = $event) !== false);
        ad = (pd_2 && ad);
    } return ad; }, select_ngfactory["b" /* View_Select_0 */], select_ngfactory["a" /* RenderType_Select */])), core["_30" /* ɵdid */](13, 1228800, null, 1, select_select["a" /* Select */], [app["a" /* App */], util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item["a" /* Item */]], deep_linker["a" /* DeepLinker */]], { interface: [0, "interface"], multiple: [1, "multiple"] }, null), core["_52" /* ɵqud */](603979776, 11, { options: 1 }), core["_50" /* ɵprd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [select_select["a" /* Select */]]), core["_30" /* ɵdid */](16, 671744, null, 0, esm5_forms["q" /* NgModel */], [[8, null], [8, null], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { model: [0, "model"] }, { update: "ngModelChange" }), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["q" /* NgModel */]]), core["_30" /* ɵdid */](18, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                    "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModGlossaryEditPage_2)), core["_30" /* ɵdid */](21, 802816, null, 0, common["j" /* NgForOf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */], core["E" /* IterableDiffers */]], { ngForOf: [0, "ngForOf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = "addon-mod-glossary-categories-label"; _ck(_v, 8, 0, currVal_0); var currVal_10 = "popover"; var currVal_11 = "true"; _ck(_v, 13, 0, currVal_10, currVal_11); var currVal_12 = _co.options.categories; _ck(_v, 16, 0, currVal_12); var currVal_13 = _co.categories; _ck(_v, 21, 0, currVal_13); }, function (_ck, _v) { var currVal_1 = core["_56" /* ɵunv */](_v, 9, 0, core["_44" /* ɵnov */](_v, 10).transform("addon.mod_glossary.categories")); _ck(_v, 9, 0, currVal_1); var currVal_2 = core["_44" /* ɵnov */](_v, 13)._disabled; var currVal_3 = core["_44" /* ɵnov */](_v, 18).ngClassUntouched; var currVal_4 = core["_44" /* ɵnov */](_v, 18).ngClassTouched; var currVal_5 = core["_44" /* ɵnov */](_v, 18).ngClassPristine; var currVal_6 = core["_44" /* ɵnov */](_v, 18).ngClassDirty; var currVal_7 = core["_44" /* ɵnov */](_v, 18).ngClassValid; var currVal_8 = core["_44" /* ɵnov */](_v, 18).ngClassInvalid; var currVal_9 = core["_44" /* ɵnov */](_v, 18).ngClassPending; _ck(_v, 12, 0, currVal_2, currVal_3, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9); }); }
function View_AddonModGlossaryEditPage_3(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 70, null, null, null, null, null, null, null)), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](2, 0, null, null, 7, "ion-item-divider", [["class", "item item-divider"], ["color", "light"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](3, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], { color: [0, "color"] }, null), core["_52" /* ɵqud */](335544320, 18, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 19, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 20, { _icons: 1 }), core["_30" /* ɵdid */](7, 16384, null, 0, item_divider["a" /* ItemDivider */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"] }, null), (_l()(), core["_55" /* ɵted */](8, 2, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](11, 0, null, null, 18, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](12, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 21, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 22, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 23, { _icons: 1 }), core["_30" /* ɵdid */](16, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](18, 0, null, 1, 3, "ion-label", [], null, null, null, null, null)), core["_30" /* ɵdid */](19, 16384, [[21, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](20, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](23, 0, null, 4, 5, "ion-toggle", [], [[2, "toggle-disabled", null], [2, "toggle-checked", null], [2, "toggle-activated", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "keyup"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("keyup" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 24)._keyup($event) !== false);
        ad = (pd_0 && ad);
    } if (("ngModelChange" === en)) {
        var pd_1 = ((_co.options.usedynalink = $event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, toggle_ngfactory["b" /* View_Toggle_0 */], toggle_ngfactory["a" /* RenderType_Toggle */])), core["_30" /* ɵdid */](24, 1228800, null, 0, toggle["a" /* Toggle */], [util_form["a" /* Form */], config["a" /* Config */], platform["a" /* Platform */], core["t" /* ElementRef */], core["V" /* Renderer */], haptic["a" /* Haptic */], [2, item["a" /* Item */]], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */], core["M" /* NgZone */]], null, null), core["_50" /* ɵprd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [toggle["a" /* Toggle */]]), core["_30" /* ɵdid */](26, 671744, null, 0, esm5_forms["q" /* NgModel */], [[8, null], [8, null], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { model: [0, "model"] }, { update: "ngModelChange" }), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["q" /* NgModel */]]), core["_30" /* ɵdid */](28, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](31, 0, null, null, 18, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](32, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 24, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 25, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 26, { _icons: 1 }), core["_30" /* ɵdid */](36, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](38, 0, null, 1, 3, "ion-label", [], null, null, null, null, null)), core["_30" /* ɵdid */](39, 16384, [[24, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](40, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](43, 0, null, 4, 5, "ion-toggle", [], [[2, "toggle-disabled", null], [2, "toggle-checked", null], [2, "toggle-activated", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "keyup"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("keyup" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 44)._keyup($event) !== false);
        ad = (pd_0 && ad);
    } if (("ngModelChange" === en)) {
        var pd_1 = ((_co.options.casesensitive = $event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, toggle_ngfactory["b" /* View_Toggle_0 */], toggle_ngfactory["a" /* RenderType_Toggle */])), core["_30" /* ɵdid */](44, 1228800, null, 0, toggle["a" /* Toggle */], [util_form["a" /* Form */], config["a" /* Config */], platform["a" /* Platform */], core["t" /* ElementRef */], core["V" /* Renderer */], haptic["a" /* Haptic */], [2, item["a" /* Item */]], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */], core["M" /* NgZone */]], { disabled: [0, "disabled"] }, null), core["_50" /* ɵprd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [toggle["a" /* Toggle */]]), core["_30" /* ɵdid */](46, 671744, null, 0, esm5_forms["q" /* NgModel */], [[8, null], [8, null], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { isDisabled: [0, "isDisabled"], model: [1, "model"] }, { update: "ngModelChange" }), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["q" /* NgModel */]]), core["_30" /* ɵdid */](48, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n                "])), (_l()(), core["_31" /* ɵeld */](51, 0, null, null, 18, "ion-item", [["class", "item item-block"], ["text-wrap", ""]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](52, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 27, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 28, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 29, { _icons: 1 }), core["_30" /* ɵdid */](56, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](58, 0, null, 1, 3, "ion-label", [], null, null, null, null, null)), core["_30" /* ɵdid */](59, 16384, [[27, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, null], [8, null], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](60, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                    "])), (_l()(), core["_31" /* ɵeld */](63, 0, null, 4, 5, "ion-toggle", [], [[2, "toggle-disabled", null], [2, "toggle-checked", null], [2, "toggle-activated", null], [2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "keyup"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("keyup" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 64)._keyup($event) !== false);
        ad = (pd_0 && ad);
    } if (("ngModelChange" === en)) {
        var pd_1 = ((_co.options.fullmatch = $event) !== false);
        ad = (pd_1 && ad);
    } return ad; }, toggle_ngfactory["b" /* View_Toggle_0 */], toggle_ngfactory["a" /* RenderType_Toggle */])), core["_30" /* ɵdid */](64, 1228800, null, 0, toggle["a" /* Toggle */], [util_form["a" /* Form */], config["a" /* Config */], platform["a" /* Platform */], core["t" /* ElementRef */], core["V" /* Renderer */], haptic["a" /* Haptic */], [2, item["a" /* Item */]], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */], core["M" /* NgZone */]], { disabled: [0, "disabled"] }, null), core["_50" /* ɵprd */](1024, null, esm5_forms["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [toggle["a" /* Toggle */]]), core["_30" /* ɵdid */](66, 671744, null, 0, esm5_forms["q" /* NgModel */], [[8, null], [8, null], [8, null], [2, esm5_forms["l" /* NG_VALUE_ACCESSOR */]]], { isDisabled: [0, "isDisabled"], model: [1, "model"] }, { update: "ngModelChange" }), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["q" /* NgModel */]]), core["_30" /* ɵdid */](68, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "]))], function (_ck, _v) { var _co = _v.component; var currVal_0 = "light"; _ck(_v, 3, 0, currVal_0); var currVal_1 = "light"; _ck(_v, 7, 0, currVal_1); var currVal_14 = _co.options.usedynalink; _ck(_v, 26, 0, currVal_14); var currVal_26 = !_co.options.usedynalink; _ck(_v, 44, 0, currVal_26); var currVal_27 = !_co.options.usedynalink; var currVal_28 = _co.options.casesensitive; _ck(_v, 46, 0, currVal_27, currVal_28); var currVal_40 = !_co.options.usedynalink; _ck(_v, 64, 0, currVal_40); var currVal_41 = !_co.options.usedynalink; var currVal_42 = _co.options.fullmatch; _ck(_v, 66, 0, currVal_41, currVal_42); }, function (_ck, _v) { var currVal_2 = core["_56" /* ɵunv */](_v, 8, 0, core["_44" /* ɵnov */](_v, 9).transform("addon.mod_glossary.linking")); _ck(_v, 8, 0, currVal_2); var currVal_3 = core["_56" /* ɵunv */](_v, 20, 0, core["_44" /* ɵnov */](_v, 21).transform("addon.mod_glossary.entryusedynalink")); _ck(_v, 20, 0, currVal_3); var currVal_4 = core["_44" /* ɵnov */](_v, 24)._disabled; var currVal_5 = core["_44" /* ɵnov */](_v, 24)._value; var currVal_6 = core["_44" /* ɵnov */](_v, 24)._activated; var currVal_7 = core["_44" /* ɵnov */](_v, 28).ngClassUntouched; var currVal_8 = core["_44" /* ɵnov */](_v, 28).ngClassTouched; var currVal_9 = core["_44" /* ɵnov */](_v, 28).ngClassPristine; var currVal_10 = core["_44" /* ɵnov */](_v, 28).ngClassDirty; var currVal_11 = core["_44" /* ɵnov */](_v, 28).ngClassValid; var currVal_12 = core["_44" /* ɵnov */](_v, 28).ngClassInvalid; var currVal_13 = core["_44" /* ɵnov */](_v, 28).ngClassPending; _ck(_v, 23, 0, currVal_4, currVal_5, currVal_6, currVal_7, currVal_8, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13); var currVal_15 = core["_56" /* ɵunv */](_v, 40, 0, core["_44" /* ɵnov */](_v, 41).transform("addon.mod_glossary.casesensitive")); _ck(_v, 40, 0, currVal_15); var currVal_16 = core["_44" /* ɵnov */](_v, 44)._disabled; var currVal_17 = core["_44" /* ɵnov */](_v, 44)._value; var currVal_18 = core["_44" /* ɵnov */](_v, 44)._activated; var currVal_19 = core["_44" /* ɵnov */](_v, 48).ngClassUntouched; var currVal_20 = core["_44" /* ɵnov */](_v, 48).ngClassTouched; var currVal_21 = core["_44" /* ɵnov */](_v, 48).ngClassPristine; var currVal_22 = core["_44" /* ɵnov */](_v, 48).ngClassDirty; var currVal_23 = core["_44" /* ɵnov */](_v, 48).ngClassValid; var currVal_24 = core["_44" /* ɵnov */](_v, 48).ngClassInvalid; var currVal_25 = core["_44" /* ɵnov */](_v, 48).ngClassPending; _ck(_v, 43, 0, currVal_16, currVal_17, currVal_18, currVal_19, currVal_20, currVal_21, currVal_22, currVal_23, currVal_24, currVal_25); var currVal_29 = core["_56" /* ɵunv */](_v, 60, 0, core["_44" /* ɵnov */](_v, 61).transform("addon.mod_glossary.fullmatch")); _ck(_v, 60, 0, currVal_29); var currVal_30 = core["_44" /* ɵnov */](_v, 64)._disabled; var currVal_31 = core["_44" /* ɵnov */](_v, 64)._value; var currVal_32 = core["_44" /* ɵnov */](_v, 64)._activated; var currVal_33 = core["_44" /* ɵnov */](_v, 68).ngClassUntouched; var currVal_34 = core["_44" /* ɵnov */](_v, 68).ngClassTouched; var currVal_35 = core["_44" /* ɵnov */](_v, 68).ngClassPristine; var currVal_36 = core["_44" /* ɵnov */](_v, 68).ngClassDirty; var currVal_37 = core["_44" /* ɵnov */](_v, 68).ngClassValid; var currVal_38 = core["_44" /* ɵnov */](_v, 68).ngClassInvalid; var currVal_39 = core["_44" /* ɵnov */](_v, 68).ngClassPending; _ck(_v, 63, 0, currVal_30, currVal_31, currVal_32, currVal_33, currVal_34, currVal_35, currVal_36, currVal_37, currVal_38, currVal_39); }); }
function View_AddonModGlossaryEditPage_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 21, "ion-header", [], null, null, null, null, null)), core["_30" /* ɵdid */](1, 16384, null, 0, toolbar_header["a" /* Header */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, view_controller["a" /* ViewController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n    "])), (_l()(), core["_31" /* ɵeld */](3, 0, null, null, 17, "ion-navbar", [["class", "toolbar"]], [[8, "hidden", 0], [2, "statusbar-padding", null]], null, null, navbar_ngfactory["b" /* View_Navbar_0 */], navbar_ngfactory["a" /* RenderType_Navbar */])), core["_30" /* ɵdid */](4, 49152, null, 0, navbar["a" /* Navbar */], [app["a" /* App */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](6, 0, null, 3, 3, "ion-title", [], null, null, null, toolbar_title_ngfactory["b" /* View_ToolbarTitle_0 */], toolbar_title_ngfactory["a" /* RenderType_ToolbarTitle */])), core["_30" /* ɵdid */](7, 49152, null, 0, toolbar_title["a" /* ToolbarTitle */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), (_l()(), core["_31" /* ɵeld */](8, 0, null, 0, 1, "core-format-text", [], null, null, null, null, null)), core["_30" /* ɵdid */](9, 540672, null, 0, format_text["a" /* CoreFormatTextDirective */], [core["t" /* ElementRef */], sites["a" /* CoreSitesProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], translate_service["a" /* TranslateService */], platform["a" /* Platform */], utils["a" /* CoreUtilsProvider */], url["a" /* CoreUrlUtilsProvider */], logger["a" /* CoreLoggerProvider */], filepool["a" /* CoreFilepoolProvider */], providers_app["a" /* CoreAppProvider */], providers_helper["a" /* CoreContentLinksHelperProvider */], [2, nav_controller["a" /* NavController */]], [2, content["a" /* Content */]]], { text: [0, "text"] }, null), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n        "])), (_l()(), core["_31" /* ɵeld */](11, 0, null, 2, 8, "ion-buttons", [["end", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](12, 16384, null, 1, toolbar_item["a" /* ToolbarItem */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, toolbar["a" /* Toolbar */]], [2, navbar["a" /* Navbar */]]], null, null), core["_52" /* ɵqud */](603979776, 1, { _buttons: 1 }), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](15, 0, null, null, 3, "button", [["ion-button", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.save() !== false);
        ad = (pd_0 && ad);
    } return ad; }, button_ngfactory["b" /* View_Button_0 */], button_ngfactory["a" /* RenderType_Button */])), core["_30" /* ɵdid */](16, 1097728, [[1, 4]], 0, button_button["a" /* Button */], [[8, ""], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], null, null), (_l()(), core["_55" /* ɵted */](17, 0, [" ", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 3, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"])), (_l()(), core["_31" /* ɵeld */](23, 0, null, null, 85, "ion-content", [], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, content_ngfactory["b" /* View_Content_0 */], content_ngfactory["a" /* RenderType_Content */])), core["_30" /* ɵdid */](24, 4374528, null, 0, content["a" /* Content */], [config["a" /* Config */], platform["a" /* Platform */], dom_controller["a" /* DomController */], core["t" /* ElementRef */], core["V" /* Renderer */], app["a" /* App */], keyboard["a" /* Keyboard */], core["M" /* NgZone */], [2, view_controller["a" /* ViewController */]], [2, nav_controller["a" /* NavController */]]], null, null), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n    "])), (_l()(), core["_31" /* ɵeld */](26, 0, null, 1, 81, "core-loading", [], null, null, null, loading_ngfactory["b" /* View_CoreLoadingComponent_0 */], loading_ngfactory["a" /* RenderType_CoreLoadingComponent */])), core["_30" /* ɵdid */](27, 638976, null, 0, loading["a" /* CoreLoadingComponent */], [translate_service["a" /* TranslateService */], core["t" /* ElementRef */]], { hideUntil: [0, "hideUntil"] }, null), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n        "])), (_l()(), core["_31" /* ɵeld */](29, 0, null, 0, 77, "ion-list", [], null, null, null, null, null)), core["_30" /* ɵdid */](30, 16384, null, 0, list["a" /* List */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], platform["a" /* Platform */], gesture_controller["l" /* GestureController */], dom_controller["a" /* DomController */]], null, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](32, 0, null, null, 18, "ion-item", [["class", "item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](33, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 2, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 3, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 4, { _icons: 1 }), core["_30" /* ɵdid */](37, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](39, 0, null, 1, 3, "ion-label", [["stacked", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](40, 16384, [[2, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, ""], [8, null], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](41, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](44, 0, null, 3, 5, "ion-input", [["type", "text"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("ngModelChange" === en)) {
        var pd_0 = ((_co.entry.concept = $event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, input_ngfactory["b" /* View_TextInput_0 */], input_ngfactory["a" /* RenderType_TextInput */])), core["_30" /* ɵdid */](45, 671744, null, 0, esm5_forms["q" /* NgModel */], [[8, null], [8, null], [8, null], [8, null]], { model: [0, "model"] }, { update: "ngModelChange" }), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["q" /* NgModel */]]), core["_30" /* ɵdid */](47, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), core["_30" /* ɵdid */](48, 5423104, null, 0, input["a" /* TextInput */], [config["a" /* Config */], platform["a" /* Platform */], util_form["a" /* Form */], app["a" /* App */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, content["a" /* Content */]], [2, item["a" /* Item */]], [2, esm5_forms["m" /* NgControl */]], dom_controller["a" /* DomController */]], { type: [0, "type"], placeholder: [1, "placeholder"] }, null), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](52, 0, null, null, 15, "ion-item", [["class", "item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](53, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 5, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 6, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 7, { _icons: 1 }), core["_30" /* ɵdid */](57, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](59, 0, null, 1, 3, "ion-label", [["stacked", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](60, 16384, [[5, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, ""], [8, null], [8, null]], null, null), (_l()(), core["_55" /* ɵted */](61, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](64, 0, null, 3, 2, "core-rich-text-editor", [["item-content", ""], ["name", "addon_mod_glossary_edit"]], null, [[null, "contentChanged"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("contentChanged" === en)) {
        var pd_0 = (_co.onDefinitionChange($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, rich_text_editor_ngfactory["b" /* View_CoreRichTextEditorComponent_0 */], rich_text_editor_ngfactory["a" /* RenderType_CoreRichTextEditorComponent */])), core["_30" /* ɵdid */](65, 1228800, null, 0, rich_text_editor["a" /* CoreRichTextEditorComponent */], [dom["a" /* CoreDomUtilsProvider */], _ionic_native_keyboard["a" /* Keyboard */], url["a" /* CoreUrlUtilsProvider */], sites["a" /* CoreSitesProvider */], filepool["a" /* CoreFilepoolProvider */], [2, content["a" /* Content */]], core["t" /* ElementRef */], events["a" /* CoreEventsProvider */], utils["a" /* CoreUtilsProvider */]], { placeholder: [0, "placeholder"], control: [1, "control"], name: [2, "name"], component: [3, "component"], componentId: [4, "componentId"] }, { contentChanged: "contentChanged" }), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModGlossaryEditPage_1)), core["_30" /* ɵdid */](70, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](72, 0, null, null, 18, "ion-item", [["class", "item item-block"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](73, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], null, null), core["_52" /* ɵqud */](335544320, 12, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 13, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 14, { _icons: 1 }), core["_30" /* ɵdid */](77, 16384, null, 0, item_content["a" /* ItemContent */], [], null, null), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](79, 0, null, 1, 3, "ion-label", [["id", "addon-mod-glossary-aliases-label"], ["stacked", ""]], null, null, null, null, null)), core["_30" /* ɵdid */](80, 16384, [[12, 4]], 0, label["a" /* Label */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [8, null], [8, ""], [8, null], [8, null]], { id: [0, "id"] }, null), (_l()(), core["_55" /* ɵted */](81, null, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n                "])), (_l()(), core["_31" /* ɵeld */](84, 0, null, 3, 5, "ion-textarea", [["aria-labelledby", "addon-mod-glossary-aliases-label"], ["core-auto-rows", ""], ["rows", "1"]], [[2, "ng-untouched", null], [2, "ng-touched", null], [2, "ng-pristine", null], [2, "ng-dirty", null], [2, "ng-valid", null], [2, "ng-invalid", null], [2, "ng-pending", null]], [[null, "ngModelChange"], [null, "input"], [null, "change"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("input" === en)) {
        var pd_0 = (core["_44" /* ɵnov */](_v, 85).onInput() !== false);
        ad = (pd_0 && ad);
    } if (("change" === en)) {
        var pd_1 = (core["_44" /* ɵnov */](_v, 85).onChange() !== false);
        ad = (pd_1 && ad);
    } if (("ngModelChange" === en)) {
        var pd_2 = ((_co.options.aliases = $event) !== false);
        ad = (pd_2 && ad);
    } return ad; }, input_ngfactory["b" /* View_TextInput_0 */], input_ngfactory["a" /* RenderType_TextInput */])), core["_30" /* ɵdid */](85, 4210688, null, 0, auto_rows["a" /* CoreAutoRowsDirective */], [core["t" /* ElementRef */]], null, null), core["_30" /* ɵdid */](86, 671744, null, 0, esm5_forms["q" /* NgModel */], [[8, null], [8, null], [8, null], [8, null]], { model: [0, "model"] }, { update: "ngModelChange" }), core["_50" /* ɵprd */](2048, null, esm5_forms["m" /* NgControl */], null, [esm5_forms["q" /* NgModel */]]), core["_30" /* ɵdid */](88, 16384, null, 0, esm5_forms["n" /* NgControlStatus */], [esm5_forms["m" /* NgControl */]], null, null), core["_30" /* ɵdid */](89, 5423104, null, 0, input["a" /* TextInput */], [config["a" /* Config */], platform["a" /* Platform */], util_form["a" /* Form */], app["a" /* App */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, content["a" /* Content */]], [2, item["a" /* Item */]], [2, esm5_forms["m" /* NgControl */]], dom_controller["a" /* DomController */]], null, { input: "input" }), (_l()(), core["_55" /* ɵted */](-1, 2, ["\n            "])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](92, 0, null, null, 7, "ion-item-divider", [["class", "item item-divider"], ["color", "light"]], null, null, null, item_ngfactory["b" /* View_Item_0 */], item_ngfactory["a" /* RenderType_Item */])), core["_30" /* ɵdid */](93, 1097728, null, 3, item["a" /* Item */], [util_form["a" /* Form */], config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */], [2, item_reorder["a" /* ItemReorder */]]], { color: [0, "color"] }, null), core["_52" /* ɵqud */](335544320, 15, { contentLabel: 0 }), core["_52" /* ɵqud */](603979776, 16, { _buttons: 1 }), core["_52" /* ɵqud */](603979776, 17, { _icons: 1 }), core["_30" /* ɵdid */](97, 16384, null, 0, item_divider["a" /* ItemDivider */], [config["a" /* Config */], core["t" /* ElementRef */], core["V" /* Renderer */]], { color: [0, "color"] }, null), (_l()(), core["_55" /* ɵted */](98, 2, ["", ""])), core["_47" /* ɵpid */](131072, translate_pipe["a" /* TranslatePipe */], [translate_service["a" /* TranslateService */], core["j" /* ChangeDetectorRef */]]), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_31" /* ɵeld */](101, 0, null, null, 1, "core-attachments", [], null, null, null, attachments_ngfactory["b" /* View_CoreAttachmentsComponent_0 */], attachments_ngfactory["a" /* RenderType_CoreAttachmentsComponent */])), core["_30" /* ɵdid */](102, 114688, null, 0, attachments["a" /* CoreAttachmentsComponent */], [providers_app["a" /* CoreAppProvider */], dom["a" /* CoreDomUtilsProvider */], utils_text["a" /* CoreTextUtilsProvider */], fileuploader["a" /* CoreFileUploaderProvider */], translate_service["a" /* TranslateService */], fileuploader_providers_helper["a" /* CoreFileUploaderHelperProvider */]], { files: [0, "files"], component: [1, "component"], componentId: [2, "componentId"], allowOffline: [3, "allowOffline"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n            "])), (_l()(), core["_26" /* ɵand */](16777216, null, null, 1, null, View_AddonModGlossaryEditPage_3)), core["_30" /* ɵdid */](105, 16384, null, 0, common["k" /* NgIf */], [core["_11" /* ViewContainerRef */], core["_6" /* TemplateRef */]], { ngIf: [0, "ngIf"] }, null), (_l()(), core["_55" /* ɵted */](-1, null, ["\n        "])), (_l()(), core["_55" /* ɵted */](-1, 0, ["\n    "])), (_l()(), core["_55" /* ɵted */](-1, 1, ["\n"])), (_l()(), core["_55" /* ɵted */](-1, null, ["\n"]))], function (_ck, _v) { var _co = _v.component; var currVal_2 = _co.module.name; _ck(_v, 9, 0, currVal_2); var currVal_6 = _co.loaded; _ck(_v, 27, 0, currVal_6); var currVal_15 = _co.entry.concept; _ck(_v, 45, 0, currVal_15); var currVal_16 = "text"; var currVal_17 = core["_56" /* ɵunv */](_v, 48, 1, core["_44" /* ɵnov */](_v, 49).transform("addon.mod_glossary.concept")); _ck(_v, 48, 0, currVal_16, currVal_17); var currVal_19 = core["_56" /* ɵunv */](_v, 65, 0, core["_44" /* ɵnov */](_v, 66).transform("addon.mod_glossary.definition")); var currVal_20 = _co.definitionControl; var currVal_21 = "addon_mod_glossary_edit"; var currVal_22 = _co.component; var currVal_23 = _co.glossary.cmid; _ck(_v, 65, 0, currVal_19, currVal_20, currVal_21, currVal_22, currVal_23); var currVal_24 = (_co.categories.length > 0); _ck(_v, 70, 0, currVal_24); var currVal_25 = "addon-mod-glossary-aliases-label"; _ck(_v, 80, 0, currVal_25); var currVal_34 = _co.options.aliases; _ck(_v, 86, 0, currVal_34); var currVal_35 = "light"; _ck(_v, 93, 0, currVal_35); var currVal_36 = "light"; _ck(_v, 97, 0, currVal_36); var currVal_38 = _co.attachments; var currVal_39 = _co.component; var currVal_40 = _co.glossary.cmid; var currVal_41 = true; _ck(_v, 102, 0, currVal_38, currVal_39, currVal_40, currVal_41); var currVal_42 = _co.glossary.usedynalink; _ck(_v, 105, 0, currVal_42); }, function (_ck, _v) { var currVal_0 = core["_44" /* ɵnov */](_v, 4)._hidden; var currVal_1 = core["_44" /* ɵnov */](_v, 4)._sbPadding; _ck(_v, 3, 0, currVal_0, currVal_1); var currVal_3 = core["_56" /* ɵunv */](_v, 17, 0, core["_44" /* ɵnov */](_v, 18).transform("core.save")); _ck(_v, 17, 0, currVal_3); var currVal_4 = core["_44" /* ɵnov */](_v, 24).statusbarPadding; var currVal_5 = core["_44" /* ɵnov */](_v, 24)._hasRefresher; _ck(_v, 23, 0, currVal_4, currVal_5); var currVal_7 = core["_56" /* ɵunv */](_v, 41, 0, core["_44" /* ɵnov */](_v, 42).transform("addon.mod_glossary.concept")); _ck(_v, 41, 0, currVal_7); var currVal_8 = core["_44" /* ɵnov */](_v, 47).ngClassUntouched; var currVal_9 = core["_44" /* ɵnov */](_v, 47).ngClassTouched; var currVal_10 = core["_44" /* ɵnov */](_v, 47).ngClassPristine; var currVal_11 = core["_44" /* ɵnov */](_v, 47).ngClassDirty; var currVal_12 = core["_44" /* ɵnov */](_v, 47).ngClassValid; var currVal_13 = core["_44" /* ɵnov */](_v, 47).ngClassInvalid; var currVal_14 = core["_44" /* ɵnov */](_v, 47).ngClassPending; _ck(_v, 44, 0, currVal_8, currVal_9, currVal_10, currVal_11, currVal_12, currVal_13, currVal_14); var currVal_18 = core["_56" /* ɵunv */](_v, 61, 0, core["_44" /* ɵnov */](_v, 62).transform("addon.mod_glossary.definition")); _ck(_v, 61, 0, currVal_18); var currVal_26 = core["_56" /* ɵunv */](_v, 81, 0, core["_44" /* ɵnov */](_v, 82).transform("addon.mod_glossary.aliases")); _ck(_v, 81, 0, currVal_26); var currVal_27 = core["_44" /* ɵnov */](_v, 88).ngClassUntouched; var currVal_28 = core["_44" /* ɵnov */](_v, 88).ngClassTouched; var currVal_29 = core["_44" /* ɵnov */](_v, 88).ngClassPristine; var currVal_30 = core["_44" /* ɵnov */](_v, 88).ngClassDirty; var currVal_31 = core["_44" /* ɵnov */](_v, 88).ngClassValid; var currVal_32 = core["_44" /* ɵnov */](_v, 88).ngClassInvalid; var currVal_33 = core["_44" /* ɵnov */](_v, 88).ngClassPending; _ck(_v, 84, 0, currVal_27, currVal_28, currVal_29, currVal_30, currVal_31, currVal_32, currVal_33); var currVal_37 = core["_56" /* ɵunv */](_v, 98, 0, core["_44" /* ɵnov */](_v, 99).transform("addon.mod_glossary.attachment")); _ck(_v, 98, 0, currVal_37); }); }
function View_AddonModGlossaryEditPage_Host_0(_l) { return core["_57" /* ɵvid */](0, [(_l()(), core["_31" /* ɵeld */](0, 0, null, null, 1, "page-addon-mod-glossary-edit", [], null, null, null, View_AddonModGlossaryEditPage_0, RenderType_AddonModGlossaryEditPage)), core["_30" /* ɵdid */](1, 114688, null, 0, edit_AddonModGlossaryEditPage, [nav_params["a" /* NavParams */], nav_controller["a" /* NavController */], translate_service["a" /* TranslateService */], dom["a" /* CoreDomUtilsProvider */], events["a" /* CoreEventsProvider */], sites["a" /* CoreSitesProvider */], fileuploader["a" /* CoreFileUploaderProvider */], utils_text["a" /* CoreTextUtilsProvider */], glossary["a" /* AddonModGlossaryProvider */], offline["a" /* AddonModGlossaryOfflineProvider */], helper["a" /* AddonModGlossaryHelperProvider */]], null, null)], function (_ck, _v) { _ck(_v, 1, 0); }, null); }
var AddonModGlossaryEditPageNgFactory = core["_27" /* ɵccf */]("page-addon-mod-glossary-edit", edit_AddonModGlossaryEditPage, View_AddonModGlossaryEditPage_Host_0, {}, {}, []);

//# sourceMappingURL=edit.ngfactory.js.map
// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.loader.js
var translate_loader = __webpack_require__(322);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.compiler.js
var translate_compiler = __webpack_require__(323);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.parser.js
var translate_parser = __webpack_require__(325);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/missing-translation-handler.js
var missing_translation_handler = __webpack_require__(324);

// EXTERNAL MODULE: ./node_modules/@ngx-translate/core/src/translate.store.js
var translate_store = __webpack_require__(417);

// EXTERNAL MODULE: ./node_modules/ionic-angular/module.js
var ionic_angular_module = __webpack_require__(638);

// EXTERNAL MODULE: ./src/pipes/pipes.module.ts + 1 modules
var pipes_module = __webpack_require__(106);

// EXTERNAL MODULE: ./node_modules/ionic-angular/util/module-loader.js
var module_loader = __webpack_require__(238);

// CONCATENATED MODULE: ./src/addon/mod/glossary/pages/edit/edit.module.ngfactory.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddonModGlossaryNewDiscussionPageModuleNgFactory", function() { return AddonModGlossaryNewDiscussionPageModuleNgFactory; });
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 






























var AddonModGlossaryNewDiscussionPageModuleNgFactory = core["_28" /* ɵcmf */](edit_module_AddonModGlossaryNewDiscussionPageModule, [], function (_l) { return core["_40" /* ɵmod */]([core["_41" /* ɵmpd */](512, core["o" /* ComponentFactoryResolver */], core["_21" /* ɵCodegenComponentFactoryResolver */], [[8, [action_sheet_component_ngfactory["a" /* ActionSheetCmpNgFactory */], alert_component_ngfactory["a" /* AlertCmpNgFactory */], app_root_ngfactory["a" /* IonicAppNgFactory */], loading_component_ngfactory["a" /* LoadingCmpNgFactory */], modal_component_ngfactory["a" /* ModalCmpNgFactory */], picker_component_ngfactory["a" /* PickerCmpNgFactory */], popover_component_ngfactory["a" /* PopoverCmpNgFactory */], select_popover_component_ngfactory["a" /* SelectPopoverNgFactory */], toast_component_ngfactory["a" /* ToastCmpNgFactory */], context_menu_popover_ngfactory["a" /* CoreContextMenuPopoverComponentNgFactory */], course_picker_menu_popover_ngfactory["a" /* CoreCoursePickerMenuPopoverComponentNgFactory */], recaptchamodal_ngfactory["a" /* CoreRecaptchaModalComponentNgFactory */], AddonModGlossaryEditPageNgFactory]], [3, core["o" /* ComponentFactoryResolver */]], core["K" /* NgModuleRef */]]), core["_41" /* ɵmpd */](4608, common["m" /* NgLocalization */], common["l" /* NgLocaleLocalization */], [core["G" /* LOCALE_ID */], [2, common["v" /* ɵa */]]]), core["_41" /* ɵmpd */](4608, esm5_forms["x" /* ɵi */], esm5_forms["x" /* ɵi */], []), core["_41" /* ɵmpd */](4608, esm5_forms["d" /* FormBuilder */], esm5_forms["d" /* FormBuilder */], []), core["_41" /* ɵmpd */](4608, translate_loader["b" /* TranslateLoader */], translate_loader["a" /* TranslateFakeLoader */], []), core["_41" /* ɵmpd */](4608, translate_compiler["a" /* TranslateCompiler */], translate_compiler["b" /* TranslateFakeCompiler */], []), core["_41" /* ɵmpd */](4608, translate_parser["b" /* TranslateParser */], translate_parser["a" /* TranslateDefaultParser */], []), core["_41" /* ɵmpd */](4608, missing_translation_handler["b" /* MissingTranslationHandler */], missing_translation_handler["a" /* FakeMissingTranslationHandler */], []), core["_41" /* ɵmpd */](4608, translate_service["a" /* TranslateService */], translate_service["a" /* TranslateService */], [translate_store["a" /* TranslateStore */], translate_loader["b" /* TranslateLoader */], translate_compiler["a" /* TranslateCompiler */], translate_parser["b" /* TranslateParser */], missing_translation_handler["b" /* MissingTranslationHandler */], translate_service["b" /* USE_DEFAULT_LANG */], translate_service["c" /* USE_STORE */]]), core["_41" /* ɵmpd */](512, common["b" /* CommonModule */], common["b" /* CommonModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["v" /* ɵba */], esm5_forms["v" /* ɵba */], []), core["_41" /* ɵmpd */](512, esm5_forms["i" /* FormsModule */], esm5_forms["i" /* FormsModule */], []), core["_41" /* ɵmpd */](512, esm5_forms["s" /* ReactiveFormsModule */], esm5_forms["s" /* ReactiveFormsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["a" /* IonicModule */], ionic_angular_module["a" /* IonicModule */], []), core["_41" /* ɵmpd */](512, _ngx_translate_core["b" /* TranslateModule */], _ngx_translate_core["b" /* TranslateModule */], []), core["_41" /* ɵmpd */](512, directives_module["a" /* CoreDirectivesModule */], directives_module["a" /* CoreDirectivesModule */], []), core["_41" /* ɵmpd */](512, pipes_module["a" /* CorePipesModule */], pipes_module["a" /* CorePipesModule */], []), core["_41" /* ɵmpd */](512, components_module["a" /* CoreComponentsModule */], components_module["a" /* CoreComponentsModule */], []), core["_41" /* ɵmpd */](512, ionic_angular_module["b" /* IonicPageModule */], ionic_angular_module["b" /* IonicPageModule */], []), core["_41" /* ɵmpd */](512, edit_module_AddonModGlossaryNewDiscussionPageModule, edit_module_AddonModGlossaryNewDiscussionPageModule, []), core["_41" /* ɵmpd */](256, translate_service["c" /* USE_STORE */], undefined, []), core["_41" /* ɵmpd */](256, translate_service["b" /* USE_DEFAULT_LANG */], undefined, []), core["_41" /* ɵmpd */](256, module_loader["a" /* LAZY_LOADED_TOKEN */], edit_AddonModGlossaryEditPage, [])]); });

//# sourceMappingURL=edit.module.ngfactory.js.map

/***/ }),

/***/ 1895:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RenderType_Toggle; });
/* harmony export (immutable) */ __webpack_exports__["b"] = View_Toggle_0;
/* unused harmony export View_Toggle_Host_0 */
/* unused harmony export ToggleNgFactory */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__button_button_ngfactory__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__button_button__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_config__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__toggle__ = __webpack_require__(639);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__util_form__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__platform_platform__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__tap_click_haptic__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__item_item__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__gestures_gesture_controller__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__platform_dom_controller__ = __webpack_require__(25);
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 












var styles_Toggle = [];
var RenderType_Toggle = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_29" /* ɵcrt */]({ encapsulation: 2, styles: styles_Toggle, data: {} });

function View_Toggle_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 1, "div", [["class", "toggle-icon"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](1, 0, null, null, 0, "div", [["class", "toggle-inner"]], null, null, null, null, null)), (_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](2, 0, null, null, 1, "button", [["class", "item-cover"], ["disable-activated", ""], ["ion-button", "item-cover"], ["role", "checkbox"], ["type", "button"]], [[8, "id", 0], [1, "aria-checked", 0], [1, "aria-labelledby", 0], [1, "aria-disabled", 0]], null, null, __WEBPACK_IMPORTED_MODULE_1__button_button_ngfactory__["b" /* View_Button_0 */], __WEBPACK_IMPORTED_MODULE_1__button_button_ngfactory__["a" /* RenderType_Button */])), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](3, 1097728, null, 0, __WEBPACK_IMPORTED_MODULE_2__button_button__["a" /* Button */], [[8, "item-cover"], __WEBPACK_IMPORTED_MODULE_3__config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */]], null, null)], null, function (_ck, _v) { var _co = _v.component; var currVal_0 = _co.id; var currVal_1 = _co._value; var currVal_2 = _co._labelId; var currVal_3 = _co._disabled; _ck(_v, 2, 0, currVal_0, currVal_1, currVal_2, currVal_3); }); }
function View_Toggle_Host_0(_l) { return __WEBPACK_IMPORTED_MODULE_0__angular_core__["_57" /* ɵvid */](0, [(_l()(), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_31" /* ɵeld */](0, 0, null, null, 2, "ion-toggle", [], [[2, "toggle-disabled", null], [2, "toggle-checked", null], [2, "toggle-activated", null]], [[null, "keyup"]], function (_v, en, $event) { var ad = true; if (("keyup" === en)) {
        var pd_0 = (__WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 2)._keyup($event) !== false);
        ad = (pd_0 && ad);
    } return ad; }, View_Toggle_0, RenderType_Toggle)), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_50" /* ɵprd */](5120, null, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["l" /* NG_VALUE_ACCESSOR */], function (p0_0) { return [p0_0]; }, [__WEBPACK_IMPORTED_MODULE_5__toggle__["a" /* Toggle */]]), __WEBPACK_IMPORTED_MODULE_0__angular_core__["_30" /* ɵdid */](2, 1228800, null, 0, __WEBPACK_IMPORTED_MODULE_5__toggle__["a" /* Toggle */], [__WEBPACK_IMPORTED_MODULE_6__util_form__["a" /* Form */], __WEBPACK_IMPORTED_MODULE_3__config_config__["a" /* Config */], __WEBPACK_IMPORTED_MODULE_7__platform_platform__["a" /* Platform */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */], __WEBPACK_IMPORTED_MODULE_8__tap_click_haptic__["a" /* Haptic */], [2, __WEBPACK_IMPORTED_MODULE_9__item_item__["a" /* Item */]], __WEBPACK_IMPORTED_MODULE_10__gestures_gesture_controller__["l" /* GestureController */], __WEBPACK_IMPORTED_MODULE_11__platform_dom_controller__["a" /* DomController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]], null, null)], null, function (_ck, _v) { var currVal_0 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 2)._disabled; var currVal_1 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 2)._value; var currVal_2 = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_44" /* ɵnov */](_v, 2)._activated; _ck(_v, 0, 0, currVal_0, currVal_1, currVal_2); }); }
var ToggleNgFactory = __WEBPACK_IMPORTED_MODULE_0__angular_core__["_27" /* ɵccf */]("ion-toggle", __WEBPACK_IMPORTED_MODULE_5__toggle__["a" /* Toggle */], View_Toggle_Host_0, { color: "color", mode: "mode", disabled: "disabled", checked: "checked" }, { ionFocus: "ionFocus", ionChange: "ionChange", ionBlur: "ionBlur" }, []);

//# sourceMappingURL=toggle.ngfactory.js.map

/***/ })

});
//# sourceMappingURL=25.js.map