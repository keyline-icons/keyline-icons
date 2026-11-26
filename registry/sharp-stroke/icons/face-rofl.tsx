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
      <path d="M2.1674 13.8228C2.056 13.2213 2 12.6111 2 12C2 6.4772 6.4772 2 12 2C17.5228 2 22 6.4772 22 12C22 17.5228 17.5228 22 12 22C10.9781 22 9.9606 21.8433 8.9833 21.5342M5.8892 9.7095L6.7189 9.8529L8.6429 10.1854L7.9689 12.0179L7.7281 12.6727M13.0219 5.6981L12.7811 6.3529L12.1071 8.1854L14.0311 8.5179L14.8608 8.6613M9.5358 15.7322L16.4643 11.7319C16.8153 12.34 17.0001 13.0297 17.0001 13.7318C17.0001 15.161 16.2377 16.4816 15 17.1962C14.3919 17.5473 13.7021 17.7321 12.9999 17.7321C11.5709 17.7321 10.2504 16.9698 9.5358 15.7322ZM4 16.9L5.5281 18.7097C5.8328 19.0706 6 19.5277 6 20C6 21.1046 5.1046 22 4 22C2.8954 22 2 21.1046 2 20C2 19.5277 2.1672 19.0706 2.4719 18.7097Z" fill="none"/>
    </svg>
  )
}
