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
      <path d="M12 1L13.6126 1C14.7172 1 15.6126 1.8954 15.6126 3C15.6126 3.2149 15.578 3.4284 15.51 3.6324L15.1153 4.8163C14.9792 5.2246 14.5971 5.5 14.1667 5.5L12 5.5L9.8333 5.5C9.4029 5.5 9.0208 5.2246 8.8847 4.8163L8.49 3.6324C8.422 3.4284 8.3874 3.2149 8.3874 3C8.3874 1.8954 9.2828 1 10.3874 1ZM15.9525 12.2885L16.9422 16.3157C16.9806 16.4717 17 16.6318 17 16.7929C17 17.2094 16.87 17.6154 16.6282 17.9543L13.6284 22.1612C13.253 22.6876 12.6464 23 12 23C11.3536 23 10.747 22.6876 10.3716 22.1612L7.3717 17.9542C7.1301 17.6155 7 17.2095 7 16.7929C7 16.6319 7.0194 16.4718 7.0578 16.3157L8.1412 11.9078L9.0374 8.2613C9.1473 7.8143 9.5481 7.5 10.0085 7.5L13.9916 7.5C14.452 7.5 14.8528 7.8143 14.9627 8.2613Z" fill="currentColor"/>
    </svg>
  )
}
