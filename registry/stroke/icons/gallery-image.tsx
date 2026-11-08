import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function GalleryImage({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M5 3H19M21 18.38L17.9199 15.3C17.3921 14.77 16.5564 14.71 15.9592 15.16L14.0408 16.6C13.4436 17.05 12.6079 16.99 12.0801 16.46L10.0607 14.44C9.4749 13.85 8.5251 13.85 7.9393 14.44L3.3787 19M5 7H19C20.1046 7 21 7.9 21 9V19C21 20.1 20.1046 21 19 21H5C3.8954 21 3 20.1 3 19V9C3 7.9 3.8954 7 5 7Z"/>
      <path d="M15 11.5C15 12.33 14.3284 13 13.5 13C12.6716 13 12 12.33 12 11.5C12 10.67 12.6716 10 13.5 10C14.3284 10 15 10.67 15 11.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
