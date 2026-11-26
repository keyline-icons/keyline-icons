import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function ShieldCog({ size = 24, ...props }: IconProps) {
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
      <path d="M21 10.543V15.778C21 15.999 20.927 16.215 20.791 16.39L19.403 18.185C18.114 19.851 16.064 21.73 13.175 22.791C12.417 23.07 11.583 23.07 10.825 22.791C7.936 21.73 5.885 19.851 4.597 18.185L3.209 16.389C3.073 16.214 3 15.999 3 15.778V5.309C3 4.802 3.379 4.375 3.882 4.316L5.065 4.175C7.443 3.893 9.248 2.703 10.328 1.655C11.229 0.781 12.771 0.781 13.672 1.655C14.752 2.703 16.557 3.893 18.935 4.175L20.118 4.316C20.621 4.375 21 4.802 21 5.309V10.543Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M14.99 12H17M14.114 14.114L15.535 15.535M12 14.99V17M9.886 14.114L8.465 15.535M9.01 12H7M9.886 9.886L8.465 8.465M12 9.01V7M14.114 9.886L15.535 8.465M14.667 12C14.667 13.473 13.473 14.667 12 14.667C10.527 14.667 9.333 13.473 9.333 12C9.333 10.527 10.527 9.333 12 9.333C13.473 9.333 14.667 10.527 14.667 12Z"/>
    </svg>
  )
}
