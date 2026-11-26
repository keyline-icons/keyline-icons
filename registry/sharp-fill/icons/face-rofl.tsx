import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function FaceRofl({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M2.167 13.823C2.056 13.221 2 12.611 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C10.978 22 9.961 21.843 8.983 21.534M5.889 9.71L6.719 9.853L8.643 10.185L7.969 12.018L7.728 12.673M13.022 5.698L12.781 6.353L12.107 8.185L14.031 8.518L14.861 8.661"/>
      <path d="M12.5 12.866L15.964 10.866C16.116 10.778 16.289 10.732 16.464 10.732C16.822 10.732 17.152 10.923 17.33 11.232C17.769 11.992 18 12.854 18 13.732C18 15.518 17.047 17.169 15.5 18.062C14.74 18.501 13.878 18.732 13 18.732C11.214 18.732 9.563 17.779 8.67 16.232C8.582 16.08 8.536 15.908 8.536 15.732C8.536 15.375 8.726 15.045 9.036 14.866L12.5 12.866ZM1.879 22.121C1.337 21.58 1 20.828 1 20C1 19.292 1.251 18.606 1.708 18.065L3.236 16.255C3.426 16.03 3.706 15.9 4 15.9C4.294 15.9 4.574 16.03 4.764 16.255L6.292 18.065C6.749 18.606 7 19.292 7 20C7 21.657 5.657 23 4 23C3.172 23 2.421 22.663 1.879 22.121Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
