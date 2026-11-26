import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ShieldInfo({ size = 24, ...props }: IconProps) {
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
      <path d="M21 10.543V15.778C21 15.999 20.927 16.215 20.791 16.39L19.403 18.185C18.114 19.851 16.064 21.73 13.175 22.791C12.417 23.07 11.583 23.07 10.825 22.791C7.936 21.73 5.885 19.851 4.597 18.185L3.209 16.389C3.073 16.214 3 15.999 3 15.778V5.309C3 4.802 3.379 4.376 3.882 4.316L5.065 4.175C7.443 3.893 9.248 2.703 10.328 1.655C11.229 0.782 12.771 0.782 13.672 1.655C14.752 2.703 16.557 3.893 18.935 4.175L20.118 4.316C20.621 4.376 21 4.802 21 5.309V10.543Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 18V10"/>
      <path d="M13 7C13 7.552 12.552 8 12 8C11.448 8 11 7.552 11 7C11 6.448 11.448 6 12 6C12.552 6 13 6.448 13 7Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
    </svg>
  )
}
