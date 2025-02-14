describe('Basic user flow for Website', () => {
  // First, visit the lab 8 website
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500/index.html');
  });

  // Next, check to make sure that all 20 <product-item> elements have loaded
  it('Initial Home Page - Check for 20 product items', async () => {
    console.log('Checking for 20 product items...');
    // Query select all of the <product-item> elements and return the length of that array
    const numProducts = await page.$$eval('product-item', (prodItems) => {
      return prodItems.length;
    });
    // Expect there that array from earlier to be of length 20, meaning 20 <product-item> elements where found
    expect(numProducts).toBe(20);
  });

  // Check to make sure that all 20 <product-item> elements have data in them
  it('Make sure <product-item> elements are populated', async () => {
    console.log('Checking to make sure <product-item> elements are populated...');
    // Start as true, if any don't have data, swap to false
    let allArePopulated = true;
    let data, plainValue;
    // Query select all of the <product-item> elements
    const prodItems = await page.$$('product-item');
    console.log(`Checking product item 1/${prodItems.length}`);

    for (const pItem in prodItems) {
      // Grab the .data property of <product-items> to grab all of the json data stored inside
      data = await prodItems[pItem].getProperty("data");
      // Convert that property to JSON
      plainValue = await data.jsonValue();
      // Make sure the title, price, and image are populated in the JSON
      if (plainValue.title.length == 0) {
        allArePopulated = false;
      }
      if (plainValue.price.length == 0) {
        allArePopulated = false;
      }
      if (plainValue.image.length == 0) {
        allArePopulated = false;
      }
      // Expect allArePopulated to still be true
      expect(allArePopulated).toBe(true);
    }
    
    // TODO - Step 1
    // Right now this function is only checking the first <product-item> it found, make it so that
    // it checks every <product-item> it found
  }, 10000);

  // Check to make sure that when you click "Add to Cart" on the first <product-item> that
  // the button swaps to "Remove from Cart"
  it('Clicking the "Add to Cart" button should change button text', async () => {
    console.log('Checking the "Add to Cart" button...');
    // TODO - Step 2
    // Query a <product-item> element using puppeteer ( checkout page.$() and page.$$() in the docs )
    // Grab the shadowRoot of that element (it's a property), then query a button from that shadowRoot.
    // Once you have the button, you can click it and check the innerText property of the button.
    // Once you have the innerText property, use innerText.jsonValue() to get the text value of it
    let textChanged = true;
    const productItem = await page.$('product-item');
    const cartButtonRoot = await productItem.getProperty('shadowRoot')
    const cartButton = await cartButtonRoot.$('button');
    await cartButton.click();
    const innerText = await cartButton.getProperty('innerText');
    const buttonValue = await innerText.jsonValue();
    
    if (buttonValue !== "Remove from Cart"){
      textChanged = false;
    }
    expect(textChanged).toBe(true);
  }, 2500);

  // Check to make sure that after clicking "Add to Cart" on every <product-item> that the Cart
  // number in the top right has been correctly updated
  it('Checking number of items in cart on screen', async () => {
    console.log('Checking number of items in cart on screen...');
    // TODO - Step 3
    // Query select all of the <product-item> elements, then for every single product element
    // get the shadowRoot and query select the button inside, and click on it.
    // Check to see if the innerText of #cart-count is 20
    let countAllCart = true;
    const allItems = await page.$$('product-item');
    for (let eachItem=1; eachItem<allItems.length; eachItem++){
      const buttonRoot = await allItems[eachItem].getProperty('shadowRoot')
      const eachButton = await buttonRoot.$('button');
      await eachButton.click();
    }
    const cartCount = await page.$('#cart-count');
    const textCart = await cartCount.getProperty('innerText')
    const totalCart = await textCart.jsonValue();
    
    console.log("total clicks are "+totalCart);
    if (totalCart !== '20'){
      countAllCart = false;
    }
    expect(countAllCart).toBe(true);
  }, 10000);

  // Check to make sure that after you reload the page it remembers all of the items in your cart
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
    // TODO - Step 4
    // Reload the page, then select all of the <product-item> elements, and check every
    // element to make sure that all of their buttons say "Remove from Cart".
    // Also check to make sure that #cart-count is still 20
    let checkAllText = true;
    await page.goto('http://127.0.0.1:5500/index.html');
    const allProducts = await page.$$('product-item');
    for (let eachItem=1; eachItem<allProducts.length; eachItem++){
      const buttonRoot = await allProducts[eachItem].getProperty('shadowRoot')
      const eachButton = await buttonRoot.$('button');
      const innerText = await eachButton.getProperty('innerText');
      const buttonValue = await innerText.jsonValue();
      if (buttonValue !== "Remove from Cart"){
        checkAllText = false;
      }
    }
    const cart = await page.$('#cart-count');
    const textC = await cart.getProperty('innerText')
    const totalC = await textC.jsonValue();
    
    console.log("total clicks are "+totalC);
    if (totalC !== '20'){
      checkAllText = false;
    }
    expect(checkAllText).toBe(true);
  }, 10000);

  // Check to make sure that the cart in localStorage is what you expect
  it('Checking the localStorage to make sure cart is correct', async () => {
    // TODO - Step 5
    // At this point he item 'cart' in localStorage should be 
    // '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]', check to make sure it is
    let checkLocal = true;
    let resultLocal = '[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]';
    let carts = await page.evaluate(() => {
      return localStorage.getItem('cart');
    });
    if (carts !== resultLocal){
      checkLocal = false;
    }
    expect(checkLocal).toBe(true);
  });

  // Checking to make sure that if you remove all of the items from the cart that the cart
  // number in the top right of the screen is 0
  it('Checking number of items in cart on screen after removing from cart', async () => {
    console.log('Checking number of items in cart on screen...');
    // TODO - Step 6
    // Go through and click "Remove from Cart" on every single <product-item>, just like above.
    // Once you have, check to make sure that #cart-count is now 0
    let checkRemoval = true;
    const products = await page.$$('product-item');
    for (let eachItem=0; eachItem<products.length; eachItem++){
      const buttonRoot = await products[eachItem].getProperty('shadowRoot')
      const eachButton = await buttonRoot.$('button');
      await eachButton.click();
    }
    const removed = await page.$('#cart-count');
    const textRemoved = await removed.getProperty('innerText');
    const jsonRemoved = await textRemoved.jsonValue();
    console.log("Item count after removal "+jsonRemoved);
    if (jsonRemoved !== '0'){
      checkRemoval = false;
    }
    expect(checkRemoval).toBe(true);
  }, 10000);

  // Checking to make sure that it remembers us removing everything from the cart
  // after we refresh the page
  it('Checking number of items in cart on screen after reload', async () => {
    console.log('Checking number of items in cart on screen after reload...');
    // TODO - Step 7
    // Reload the page once more, then go through each <product-item> to make sure that it has remembered nothing
    // is in the cart - do this by checking the text on the buttons so that they should say "Add to Cart".
    // Also check to make sure that #cart-count is still 0
    let checkReload = true;
    await page.goto('http://127.0.0.1:5500/index.html');
    const products = await page.$$('product-item');
    for (let eachItem=0; eachItem<products.length; eachItem++){
      const buttonRoot = await products[eachItem].getProperty('shadowRoot')
      const eachButton = await buttonRoot.$('button');
      const innerText = await eachButton.getProperty('innerText');
      const buttonValue = await innerText.jsonValue();
      if (buttonValue !== "Add to Cart"){
        checkReload = false;
      }
    }
    const removed = await page.$('#cart-count');
    const textRemoved = await removed.getProperty('innerText');
    const jsonRemoved = await textRemoved.jsonValue();
    
    if (jsonRemoved !== '0'){
      checkReload = false;
    }
    expect(checkReload).toBe(true);
  }, 10000);

  // Checking to make sure that localStorage for the cart is as we'd expect for the
  // cart being empty
  it('Checking the localStorage to make sure cart is correct', async () => {
    console.log('Checking the localStorage...');
    // TODO - Step 8
    // At this point he item 'cart' in localStorage should be '[]', check to make sure it is
    let lastLocal = true;
    let expectedLocal = '[]';
    let carts = await page.evaluate(() => {
      return localStorage.getItem('cart');
    });
    if (carts !== expectedLocal){
      lastLocal = false;
    }
    expect(lastLocal).toBe(true);
  });
});
