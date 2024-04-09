import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket; //Storage

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Databases(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabasectId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("create post error :: ", error);
    }
  }

  async updatePost(slug, { title, slug, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabasectId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("update post error :: ", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabasectId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("delete post error :: ", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return this.databases.getDocument(
        conf.appwriteDatabasectId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("get post error :: ", error);
      return false;
    }
    return null;
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabasectId,
        conf.appwriteCollectionId,
        queries
        // [
        //   Query.equal("status", "active")
        // ]
      );
    } catch (error) {
      console.log("get post error :: ", error);
      return false;
    }
    return null;
  }
}

const service = new Service();

export default service;
