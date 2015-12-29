var Lego = (function (Lego, $, undefined) {
	"use strict";
	var CANVAS = {
		CANVAS_DOC: "",
		CANVAS_WIDTH: 0,
		CANVAS_HEIGHT: 0
	};
	var PICTURE = {
		LOAD_SRC: "",
		SAVE_SRC: "",
		LOAD_BINARY: "",
		TRAN_BINARY: null
	};
	var DATA = {
		LEGO_SRC: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAGuklEQVR42mL8//8/w2ACf/78+fbtG0AAMTEMMsDCwvLv3z+AABp0zgICoLMAAmgwOgsIAAJokDoLIIAGqbMAAmiQOgsggFgo0fwfDBgZGeFcCAMuAmeQCgACiIVsByFbjGw9XArZxaQCgABiIdtNmFaiORHCwKUYPwAIIHLSFiMYEK8YHt3EWwEQQCyUJCyglfijDDn80BIifgAQQEwUpnfkYMDDIDUeAQKIhZL0jsZGdisTExPEKcghBGSAKhYmwmEBEEAsREYWZjAALUBOZBArkSMX4jiIFrhTiAwzgABiIjLNIidb5IhDlgWygdbDReBugvsH7kOCOQAggFiICSdMRyDnR7gaCAMSMPBAwpUV8OcAgABiIbVoQHYicirBTEbwEgvZbkhEE4xKgABiIpiu4eFPMHFglUILYHi6xB+VAAFEwFlYdULSMsEMhcsDyAZC3IcJAAKIhcg6GBIXX758uXr1qpGREcRN7969u3z5Mg8Pz48fP5iZmfX19T99+vTgwQNgw1dWVlZMTAySPYFaXr16xc/Pr6WlxcHBATHtHxgA2UCNmA4ACCAm/CU4PMAhTnz8+DEXFxcrKytEGdBZysrKSkpK3NzcUlJSP3/+vH37tp6eHtB97OzsQLcC1Rw/fnzp0qVA7nEwgHgPYiyuoAICgABkl8kJADAIBPuvxTIsRkRsQAlkQAgJ2Yes4v0QfI71wXoxYwE2wVsyKrKq7ih37+7hZiYiEFVlx2OMCFonIYF4wsn2V8/MLYAIpy3kdMDJycnGxgbPYsDIQi7MgAEJjBGIiKioqL+/P1ALMDiB4hATIJ6EFByQMIN4A9N2gADCl7bQki0wUoDugBeYL168mDFjBjCtAMXT09MlJSWfPXu2bds2YPICusbb29vU1PTNmzdABRD1QEGgFiEhIbg3gGEGDDBeXl5MBwAEEAueXhHQEch5CmgH0FB4JgeGf1paGjB4gMqA4kDHiYuLR0dHA6MMKAIJFaA7VFRUIIYAxb9//45c9AOtgCjDBAABxIK/vwYvtYFsoMXASITkBqAvgd1fYDKHKwYmLAkJCWB2A0YfUAqoHqgGKA4MLYiCW7duQUIOnp+ABgJVYi1HAAIIZ9oCxjqkMoY4DugtBQUFYNjAaxhgokHuoQsLCwOzG4QLiUegGjU1NYgIML7ev3+vqqoKj0Gggo8fP2ItHYAAIICwOwtoIsQrcJ8BRYDlAjxLAtnw1A0EwJIC7qbPnz8Dcx9QL1ALMH9ABC9evAhMfMByBNnbQIfCdaEBgAB0lEENQDEIQy9fAgZwAAJxgQKMcF8mBgn/JbvsMq5NaCFtv1dB8x6uERHo6YWqgh4yFpEs0NMjqMezZrb3VlV043oSABoR7s6H1lrdnZnnqrN/ZnDbLfSeXwC6yuAEABiEgXQBwTFcwOn9uoVPB+mB4Kf0H0iMJp7fV4KvqljciGA4NK2Xc7lgYMI5EaGTwIM0M1Xl6rs7IiZrpJLW3aIGlplocveXGu+vAGLE0+6BFJ7ArAR0BCQRwGshzJYTchWJtbcDCWBIerh///7u3bujoqKAWQSrswACCF91C0wNwDAARiUkhcLDDAggBSMkx0GiBln8HxKAq4TXs8Aw3rFjh7q6OjCMcVkNEED4nAVMRvLy8sDQhlQ4kIyJ3OBBDhXMXhpapwjezgYaCKy5LS0t8bSRAAKIQDMQ6Cxg3gYaZGVlBSy0kB2B1pZHbpChNfkhJQhEZOHChcDqvLi4GGIaLgAQQITbTMCyB2j69OnTgfkZXszCSwp4KwO5fYbZUYPkkpMnT549ezY7OxuYwfHbCxBA2FsQaADo1/nz5wOrmkuXLgErEGDiAOZtYMwCGb9g4DcYAFUCSbgIRCWQ/fXr1zlz5gQGBgKTM0HrgC0IgABiJL4Pfu7cuQULFgAzZkREBDC1QnIWMIdCQgK5MwIJPKAghHH37t2uri5gpQSMO+T6ChcAOh0ggBhJGhoAxiOw1QBsKTg7OxsbGwMLJGChBelrQEoyoFshFRSQDSyxgBl53bp1wLgDVuF+fn64qhpMZwEEECMZA+DANiqwiXfz5k1gw0ELDIDtZmC2BboGWBkD4wvYBgTWNsCk/ejRI6CDPDw84E0uIp0FEECMZI/LAxMZMFqPHTsGLNiAqQeS4yBtBGAuA5bgwMwLLPGBLibVZKCzAAKIkSrTBWiGQKoXIqMMq7MAAoiFgRoAs2Ak200QABBAg3RIFyCABqmzAAJokDoLIIAGqbMAAmiQOgsggAadsyBlDUAAsUB635AW3CCZ8gS6BCDAAJunjPbmthl4AAAAAElFTkSuQmCC",
		LEGO_BIN: "",
		BLOCK_SIZE: 0.024,
		ORI_WIDTH: 0,
		FIX_WIDTH: 0,
		ORI_HEIGHT: 0,
		FIX_HEIGHT: 0
	};

	var loadPic = function (fn) {
		var image = new Image();
		image.onload = function () {
			PICTURE.LOAD_BINARY = image;
			DATA.ORI_WIDTH = image.width;
			DATA.ORI_HEIGHT = image.height;
			CANVAS.CANVAS_WIDTH = image.width;
			CANVAS.CANVAS_HEIGHT = image.height;

			CANVAS.CANVAS_DOC.width = CANVAS.CANVAS_WIDTH;
			CANVAS.CANVAS_DOC.height = CANVAS.CANVAS_HEIGHT;
			fn.apply();
		};
		image.src = PICTURE.LOAD_SRC;
	};

	var layerLego = function (ctx) {
		ctx.mozImageSmoothingEnabled = true;
		ctx.webkitImageSmoothingEnabled = true;
		ctx.imageSmoothingEnabled = true;
		for (var w = 0; w < CANVAS.CANVAS_WIDTH; w += 1/DATA.BLOCK_SIZE) {
			for (var h = 0; h < CANVAS.CANVAS_HEIGHT; h += 1/DATA.BLOCK_SIZE) {
				ctx.drawImage(DATA.LEGO_BIN, 0, 0, 50, 50, w, h, 1/DATA.BLOCK_SIZE, 1/DATA.BLOCK_SIZE);
			}
		}
	};

	var transforming = function () {
		//canvas redraw
		var canv = CANVAS.CANVAS_DOC;
		var ctx = canv.getContext("2d");
		ctx.clearRect(0, 0, canv.width, canv.height);
		ctx.mozImageSmoothingEnabled = false;
		ctx.webkitImageSmoothingEnabled = false;
		ctx.imageSmoothingEnabled = false;
		ctx.drawImage(PICTURE.LOAD_BINARY, 0, 0, DATA.ORI_WIDTH, DATA.ORI_HEIGHT, 0, 0, CANVAS.CANVAS_WIDTH * DATA.BLOCK_SIZE, CANVAS.CANVAS_HEIGHT * DATA.BLOCK_SIZE);
		ctx.drawImage(canv, 0, 0, CANVAS.CANVAS_WIDTH * DATA.BLOCK_SIZE, CANVAS.CANVAS_HEIGHT * DATA.BLOCK_SIZE, 0, 0, CANVAS.CANVAS_WIDTH, CANVAS.CANVAS_HEIGHT);

		PICTURE.TRAN_BINARY = ctx.getImageData(0, 0, CANVAS.CANVAS_WIDTH, CANVAS.CANVAS_HEIGHT);
		console.log(PICTURE.TRAN_BINARY);
		ctx.clearRect(0, 0, canv.width, canv.height);
		ctx.putImageData(PICTURE.TRAN_BINARY,0,0);
		ctx.globalCompositeOperation = "multiply";
		layerLego(ctx);
	};

	var drawCanvas = function () {
		var ctx = CANVAS.CANVAS_DOC.getContext("2d");
		ctx.drawImage(PICTURE.LOAD_BINARY, 0, 0, DATA.ORI_WIDTH, DATA.ORI_HEIGHT, 0, 0, CANVAS.CANVAS_WIDTH, CANVAS.CANVAS_HEIGHT);
	};

	var legoImgload = function () {
		var image = new Image();
		image.onload = function () {
			this.height = 20;
			this.width = 20;
			DATA.LEGO_BIN = this;
		};
		image.src = DATA.LEGO_SRC;

	};

	var meterwork = function (node) {
		node.attr("min",25);
		node.attr("max",50);
		node.on("change", function () {
			DATA.BLOCK_SIZE = this.value / 1000;
			transforming();
		});
	};

	var namechange = function (node,node2) {
		node.on("change", function () {
			PICTURE.SAVE_SRC = this.value;
			node2.attr("download",PICTURE.SAVE_SRC+".jpg");
		});
	};

	var savePic = function (node) {
		node.click(function(){
			PICTURE.TRAN_BINARY = CANVAS.CANVAS_DOC.toDataURL("image/png");
			this.href = PICTURE.TRAN_BINARY;
		});
	};

	Lego.run = function (imagesrc,canvasNodeId,rangeNodeId,nameNodeId,saveNodeId) {
		PICTURE.LOAD_SRC = imagesrc;
		CANVAS.CANVAS_DOC = document.getElementById(canvasNodeId);
		loadPic(drawCanvas);
		legoImgload();
		meterwork($("#"+rangeNodeId));
		namechange($("#"+nameNodeId),$("#"+saveNodeId));
		savePic($("#"+saveNodeId));
	};
	return Lego;
})(window.Lego || {}, jQuery);
Lego.run($("#load-image").attr("src"),'test','meter','name','save');
