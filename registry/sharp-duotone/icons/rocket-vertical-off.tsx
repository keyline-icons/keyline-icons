import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function RocketVerticalOff({ size = 24, ...props }: IconProps) {
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
      <path d="M16.1186 11.4966C16.1083 11.7974 16.0867 12.0978 16.0539 12.397L9.2143 5.5575C9.2592 5.4703 9.3052 5.3837 9.3523 5.2976L8.4748 4.818C9.2127 3.468 10.1834 2.259 11.3421 1.2468C11.5243 1.0876 11.758 0.9999 12 0.9999C12.242 0.9999 12.4757 1.0876 12.6579 1.2468C15.4969 3.7271 17.1257 7.313 17.1257 11.0828C17.1257 11.2321 17.1231 11.3814 17.118 11.5307L16.1186 11.4966ZM7.3886 15.194L6.2355 16.3471L8.2083 19.9755L7.3886 15.194ZM15.7917 19.9756L17.1242 17.525L18.8812 18.4804L16.7077 22.4777C16.5327 22.7996 16.1956 23 15.8292 23C15.564 23 15.3096 22.8946 15.1221 22.7071L14.2206 21.8056L9.7794 21.8056L8.8779 22.7071C8.6904 22.8946 8.436 23 8.1708 23C7.8044 23 7.4673 22.7996 7.2923 22.4777L4.1215 16.6461C4.0418 16.4995 4 16.3353 4 16.1684C4 15.9032 4.1054 15.6488 4.2929 15.4613L6.9838 12.7703C6.9109 12.2107 6.8743 11.647 6.8743 11.0826C6.8743 10.0378 6.9997 8.9967 7.2477 7.9817L9.1905 8.4565C9.1416 8.6566 9.0983 8.8581 9.0606 9.0606L15.5378 15.5379L16.5235 15.7069L15.7917 19.9756Z" fill="currentColor" fillOpacity="0.4" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M1.7071 1.7071L22.2929 22.2929" fill="none"/>
    </svg>
  )
}
