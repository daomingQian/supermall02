export default {
	cartList(state,obj){
		// let oldProduct = null
		
		// for(let item of state.listShop){
		// 	if(item.iid===obj.iid){
		// 		//数据指向是引用类型所以 count会一直存在
		// 		oldProduct=item
		// 	}
		// }
		let oldProduct = state.listShop.find(item=>item.iid===obj.iid)
		
		if(oldProduct){
			oldProduct.count++
		}else{
			obj.count = 1
			state.listShop.push(obj)
		}
		console.log(obj)
	},
	
	checked(state,{index}){
		state.listShop[index].is_checked = !state.listShop[index].is_checked
	},
	
	allChecked(state){
		state.listShop.forEach(item=>{
			item.is_checked = true
		})
	},
	
	noChecked(state){
		state.listShop.forEach(item=>{
			item.is_checked = false
		})
	}
}