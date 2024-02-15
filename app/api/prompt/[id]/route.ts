import {
  responseError404,
  responseError500,
  responseSuccess,
} from "@app/api/helpers";
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/connection";

interface Params {
  id: string;
}

export const GET = async (
  request: Request,
  { params }: { params: Params }
): Promise<Response> => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return responseError404("Prompt Not Found");
    }

    return responseSuccess(JSON.stringify(prompt));
  } catch (error) {
    return responseError500();
  }
};

export const PATCH = async (
  request: Request,
  { params }: { params: Params }
): Promise<Response> => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return responseError404("Prompt Not Found");
    }

    // Update the prompt with new data
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return responseSuccess("Successfully updated the Prompts");
  } catch (error) {
    return responseError500("Error Updating Prompt");
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: Params }
): Promise<Response> => {
  try {
    await connectToDB();

    await Prompt.findByIdAndDelete(params.id);

    return responseSuccess("Prompt deleted successfully");
  } catch (error) {
    return responseError500("Error deleting prompt");
  }
};
