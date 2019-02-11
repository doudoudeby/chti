/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ChtiComponentsPage, ChtiDeleteDialog, ChtiUpdatePage } from './chti.page-object';

const expect = chai.expect;

describe('Chti e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let chtiUpdatePage: ChtiUpdatePage;
    let chtiComponentsPage: ChtiComponentsPage;
    let chtiDeleteDialog: ChtiDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Chtis', async () => {
        await navBarPage.goToEntity('chti');
        chtiComponentsPage = new ChtiComponentsPage();
        await browser.wait(ec.visibilityOf(chtiComponentsPage.title), 5000);
        expect(await chtiComponentsPage.getTitle()).to.eq('Chtis');
    });

    it('should load create Chti page', async () => {
        await chtiComponentsPage.clickOnCreateButton();
        chtiUpdatePage = new ChtiUpdatePage();
        expect(await chtiUpdatePage.getPageTitle()).to.eq('Create or edit a Chti');
        await chtiUpdatePage.cancel();
    });

    it('should create and save Chtis', async () => {
        const nbButtonsBeforeCreate = await chtiComponentsPage.countDeleteButtons();

        await chtiComponentsPage.clickOnCreateButton();
        await promise.all([chtiUpdatePage.setNameInput('name')]);
        expect(await chtiUpdatePage.getNameInput()).to.eq('name');
        await chtiUpdatePage.save();
        expect(await chtiUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await chtiComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Chti', async () => {
        const nbButtonsBeforeDelete = await chtiComponentsPage.countDeleteButtons();
        await chtiComponentsPage.clickOnLastDeleteButton();

        chtiDeleteDialog = new ChtiDeleteDialog();
        expect(await chtiDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Chti?');
        await chtiDeleteDialog.clickOnConfirmButton();

        expect(await chtiComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
