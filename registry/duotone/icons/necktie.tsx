import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Necktie({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M9.4599 6.542L8.49 3.6324C8.422 3.4284 8.3874 3.2149 8.3874 3C8.3874 1.8954 9.2828 1 10.3874 1L13.6126 1C14.7172 1 15.6126 1.8954 15.6126 3C15.6126 3.2149 15.578 3.4284 15.51 3.6324L14.9793 5.2243L14.5401 6.542L15.7067 11.2885L16.9422 16.3157C16.9806 16.4718 17 16.6319 17 16.7929C17 17.2094 16.87 17.6154 16.6282 17.9543L13.6284 22.1612C13.253 22.6876 12.6464 23 12 23C11.3536 23 10.747 22.6876 10.3716 22.1612L7.3717 17.9542C7.13 17.6154 7 17.2094 7 16.7929C7 16.6319 7.0194 16.4718 7.0578 16.3157Z" fill="currentColor" fillOpacity="0.4"/>
      <path d="M14.9793 5.2243L14.4487 6.8162C14.3126 7.2246 13.9304 7.5 13.5 7.5L10.5 7.5C10.0696 7.5 9.6874 7.2246 9.5513 6.8162L8.49 3.6324C8.422 3.4284 8.3874 3.2149 8.3874 3C8.3874 1.8954 9.2828 1 10.3874 1L13.6126 1C14.7172 1 15.6126 1.8954 15.6126 3C15.6126 3.2149 15.578 3.4284 15.51 3.6324Z" fill="currentColor"/>
    </svg>
  )
}
