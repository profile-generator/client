var baseURL = "http://localhost:3000"

Vue.component("user-card", {
  props: ['currentuser', 'user'],
  data() {
    return {
      liked: false,
    }
  },
  computed:{
    // liked: function() {
    //   // return true
    //   console.log("kesini", this.currentuser);
    //   this.currentuser.likes.forEach(id => {
    //     // console.log(id);
    //     if(id ==this.user._id) return true
    //   });
    //   return false
    // }
  },
  methods: {
    like(){
      // axios({
      //   method: "POST",
      //   url: `${baseURL}/users/likes/${id}`,
      //   headers: { token: localStorage.token },
      // })
      //   .then(({ data }) => {
      //     console.log(data);
      //     this.$emit('like', data._id)
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

      this.liked = true;
    },
    dislike(){
      // axios({
      //   method: "POST",
      //   url: `${baseURL}/users/dislikes/${id}`,
      //   headers: { token: localStorage.token },
      // })
      //   .then(({ data }) => {
      //     this.$emit('dislike', data._id)
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
      this.liked = false;
    }
  },
  template: `
  <div class="card" id="card-minder">
    <div class="card-image">
        <figure class="image is-1by1">
            <img :src="user.profileImage" alt="Placeholder image">
        </figure>
    </div>
    <div class="card-content">
        <div class="content">
            <div class="card-content-row">
                <div>
                    Name:
                </div>
                <div style="font-weight: bold;">
                    {{ user.name }}
                </div>
            </div>

            <div class="card-content-row">
                <div>
                    Date of Birth:
                </div>
                <div style="font-weight: bold;">
                    {{ user.birthdate }}
                </div>
            </div>

            <div class="card-content-row">
                <div>
                    Occupation:
                </div>
                <div style="font-weight: bold;">
                    Bartender
                </div>
            </div>

            <div class="card-content-row">
                <div>
                    Gender:
                </div>
                <div style="font-weight: bold;">
                    <div v-if="user.gender === 'Male'">
                        <i class="fas fa-mars"></i> Male
                    </div>
                    <div v-else>
                        <i class="fas fa-venus"></i> Female
                    </div>
                </div>
            </div>

            <div class="card-content-row">
                <div>
                    Location:
                </div>
                <div>
                    {{ user.location }}
                </div>
            </div>

            <div>
            </div>

        </div>
    </div>

    <div>
        <div class="content">
            <b-button type="is-primary" size="is-large" class="is-fullwidth" v-if="!liked" @click.prevent="like()"><i
                    class="fas fa-heart"></i> Like
            </b-button>
            <b-button type="is-primary" size="is-large" class="is-fullwidth" @click.prevent="dislike()" v-else><i
                    class="fas fa-check"></i> Liked
            </b-button>
        </div>
    </div>

</div>
  
  `
})